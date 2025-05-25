import { GetCollectionsResponse, ProductByHandleResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopifyApi = createApi({
  reducerPath: 'shopifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    prepareHeaders: (headers) => {
      headers.set('X-Shopify-Storefront-Access-Token', process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProductByHandle: builder.query<ProductByHandleResponse, string>({
      query: (handle) => ({
        url: '/', // Required for FetchArgs to be valid
        method: 'POST',
        body: {
          query: `
              query GetProductByHandle($handle: String!) {
                productByHandle(handle: $handle) {
                  id
                  title
                  description
                  descriptionHtml
                  handle
                  priceRange {
                    minVariantPrice { amount }
                  }
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  variants(first: 10) {
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        price {
                          amount
                        }
                      }
                    }
                  }
                }
              }
            `,
          variables: { handle },
        },
      }),
      transformResponse: (response: any) => response.data,
    }),

    createCart: builder.mutation<{
      cartCreate: {
        cart: {
          id: string;
          checkoutUrl: string;
        };
        userErrors: { field: string[]; message: string }[];
      };
    }, { variantId: string; quantity: number }[]>({
      query: (items) => ({
        url: '',
        method: 'POST',
        body: {
          query: `
        mutation CreateCart($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
          variables: {
            input: {
              lines: items.map((item) => ({
                quantity: item.quantity,
                merchandiseId: item.variantId,
              })),
            },
          },
        },
      }),
      transformResponse: (response: any) => response.data,
    }),

    search: builder.query<any, string>({
      query: (term) => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
        query SearchQuery($query: String!) {
          products(first: 50, query: $query) {
            edges {
              node {
                id
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                collections(first: 5) {
                  edges {
                    node {
                      handle
                      title
                    }
                  }
                }
              }
            }
          }
          collections(first: 50) {
            edges {
              node {
                id
                title
                handle
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      `,
          variables: {
            query: term,
          },
        },
      }),
      transformResponse: (response: any) => response.data,
    }),

    getProducts: builder.query<any, void>({
      query: () => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }

      }
    `,
        },
      }),
      transformResponse: (res: any) => res.data.products,
    }),
    getCollections: builder.query<GetCollectionsResponse, void>({
      query: () => ({
        url: '/', // Shopify Storefront GraphQL endpoint
        method: 'POST',
        body: {
          query: `
            query GetCollections {
              collections(first: 20) {
                edges {
                  node {
                    id
                    title
                    handle
                  }
                }
              }
            }
          `,
        },
      }),
      transformResponse: (response: any) => response.data,
    }),

    getCollectionByHandle: builder.query<any, string>({
      query: (handle) => ({
        url: '/',
        method: 'POST',
        body: {
          query: `
        query CollectionByHandle($handle: String!) {
          collectionByHandle(handle: $handle) {
            id
            title
            description
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      `,
          variables: { handle },
        },
      }),
      transformResponse: (res: any) => res.data,
    }),

  }),
});

export const {
  useGetProductByHandleQuery,
  useCreateCartMutation,
  useSearchQuery,
  useGetProductsQuery,
  useGetCollectionByHandleQuery,
  useGetCollectionsQuery,
} = shopifyApi;
