'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useGetProductByHandleQuery } from '@/features/shopifyApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/features/cartSlice';
import { useState, useEffect, useMemo } from 'react';
import VariantSelector from '@/components/VariantSelector';
import Image from 'next/image';
import { useCreateCartMutation } from '@/features/shopifyApi';
import ProductPageSkeleton from '@/components/skeletons/ProductPageSkeleton';

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const searchParams = useSearchParams();
  const selectedVariantIdFromUrl = searchParams.get('variant');
  const { data, isLoading, isError } = useGetProductByHandleQuery(handle);
  const dispatch = useAppDispatch();
  const [createCart] = useCreateCartMutation(); // Add inside your component

  const product = data?.productByHandle;
  const variants = useMemo(() => {
    return product?.variants?.edges.map(edge => edge.node) || [];
  }, [product]);

  const [selectedVariant, setSelectedVariant] = useState<typeof variants[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    if (!variants.length) return;

    const variantFromURL = variants.find(v => v.id === selectedVariantIdFromUrl);
    const fallback = variants[0];

    const selected = variantFromURL || fallback;
    setSelectedVariant(selected);
  }, [variants, selectedVariantIdFromUrl]);

  useEffect(() => {
    if (!selectedVariant) return;

    const cartMatch = cartItems.find(item => item.variantId === selectedVariant.id);
    setQuantity(cartMatch?.quantity || 1);
  }, [selectedVariant, cartItems]);

  useEffect(() => {
    if (product?.images.edges.length && !selectedImage) {
      setSelectedImage(product.images.edges[0].node.url);
    }
  }, [product, selectedImage]);

  if (isLoading) return <ProductPageSkeleton />;

  if (isError || !product) return <div className="text-red-500 text-center py-10">Product not found.</div>;

  const priceAED = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount || '0');
  const tax = (priceAED * 0.05).toFixed(2);
  const total = (priceAED + parseFloat(tax)).toFixed(2);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    dispatch(addToCart({
      id: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      handle: product.handle,
      price: priceAED,
      image: selectedImage || '',
      variantTitle: selectedVariant.title,
      quantity,
    }));
  };

  const handleBuyNow = async () => {
    if (!selectedVariant || quantity < 1) {
      alert('Please select a valid variant and quantity.');
      return;
    }

    try {
      const result = await createCart([
        {
          variantId: selectedVariant.id,
          quantity,
        },
      ]).unwrap();

      const checkoutUrl = result.cartCreate?.cart?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        console.error(result.cartCreate.userErrors);
        alert('Unable to create checkout. Please try again.');
      }
    } catch (error) {
      console.error('Buy Now failed:', error);
      alert('Error creating checkout.');
    }
  };



  const handleVariantChange = (variant: typeof variants[0]) => {
    setSelectedVariant(variant);
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState(null, '', url.toString());
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10 animate-fadeIn">
        {/* Images */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow-md mb-4 border hover:shadow-lg transition-all duration-300">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.edges.map(({ node }) => (
              <button
                key={node.url}
                onClick={() => setSelectedImage(node.url)}
                className={`rounded-lg border-2 transition-all duration-200 ${selectedImage === node.url ? 'border-black' : 'border-transparent'
                  }`}
              >
                <Image
                  src={node.url}
                  alt={node.altText || product.title}
                  width={80}
                  height={80}
                  className="object-cover w-20 h-20 rounded-lg hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Variant Selector */}
          {variants.length > 1 && (
            <VariantSelector
              variants={variants}
              selectedVariantId={selectedVariant?.id}
              onVariantChange={handleVariantChange}
            />

          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="font-medium">Quantity:</span>
            <button
              className="px-3 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >−</button>
            <span className="text-lg">{quantity}</span>
            <button
              className="px-3 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setQuantity((q) => q + 1)}
            >+</button>
          </div>

          {/* Pricing */}
          <div className="text-xl font-semibold text-gray-800 space-y-1">
            <div className="text-green-600">AED {priceAED.toFixed(2)}</div>
            <div className="text-sm text-gray-500">VAT (5%): AED {tax}</div>
            <div className="text-sm text-gray-700 font-medium">Total: AED {total}</div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-full transition duration-300 shadow hover:shadow-lg w-full"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-lime-500 hover:bg-lime-600 text-black py-3 px-6 rounded-full transition duration-300 shadow w-full"
            >
              BUY NOW ➔
            </button>
          </div>

          {/* Delivery Info */}
          <div className="flex flex-col sm:flex-row gap-6 mt-4 text-sm text-gray-600">
            <div>🕓 Estimate delivery: <strong>12–26 days</strong></div>
            <div>↩ Return within <strong>30 days</strong></div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="flex gap-4 border-b pb-2 text-sm font-medium">
              {['details', 'reviews', 'return', 'custom'].map((tab) => (
                <button
                  key={tab}
                  className={`capitalize transition-all ${activeTab === tab
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-700 leading-relaxed">
              {activeTab === 'details' && (
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
              )}
              {activeTab === 'reviews' && <p>No reviews yet.</p>}
              {activeTab === 'return' && (
                <ul className="list-disc list-inside space-y-1">
                  <li>Return within 30 days of purchase</li>
                  <li>Duties & taxes are non-refundable</li>
                  <li>Product must be unused</li>
                </ul>
              )}
              {activeTab === 'custom' && <p>Custom tab content here.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
