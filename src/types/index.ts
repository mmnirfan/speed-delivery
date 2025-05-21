// src/types/index.ts

export interface ProductByHandleResponse {
  productByHandle: {
    id: string;
    title: string;
    description: string;
    descriptionHtml: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    images: {
      edges: {
        node: {
          url: string;
          altText: string | null;
        };
      }[];
    };
    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          selectedOptions: {
            name: string;
            value: string;
          }[];
          price: {
            amount: string;
          };
        };
      }[];
    };
  };
}

export type Collection = {
  id: string;
  title: string;
  handle: string;
};

export type GetCollectionsResponse = {
  collections: {
    edges: {
      node: Collection;
    }[];
  };
};
