'use client';

import Image from 'next/image';
import { useState } from 'react';

type Image = {
  url: string;
  altText?: string | null;
};

interface ImageGalleryProps {
  images: Image[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Main Image */}
      <div className="border rounded-md overflow-hidden">
        <Image
          width={400}
          height={400}
          src={selectedImage.url}
          alt={selectedImage.altText || 'Product image'}
          className="w-full h-[400px] object-contain bg-white"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            className={`w-20 h-20 border rounded-md overflow-hidden ${
              selectedImage.url === img.url ? 'ring-2 ring-black' : ''
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img.url}
              alt={img.altText || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              width={80}
              height={80}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
