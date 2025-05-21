// src/lib/shopify.ts

import { SHOPIFY_GRAPHQL_API } from './constants';

export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(SHOPIFY_GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error('Shopify API Error:', json.errors);
    throw new Error('Shopify API returned errors');
  }

  return json.data;
}

// Fetch a single product manually
export async function getProductByHandle(handle: string) {
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
      }
    }
  `;
  return shopifyFetch(query, { handle });
}
