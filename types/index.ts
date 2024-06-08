// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
};

// ====== PRODUCT PARAMS
export type CreateProductParams = {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  properties: { key: string; value: string }[];
};

export type deleteProdName = {
  title: string;
};

export type UpdateProductParams = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  properties: { key: string; vals: string }[];
};

export type DeleteProductParams = {
  eventId: string;
  path: string;
};

export type GetAllProductsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetRelatedProductsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  properties: { key: string; value: string }[];
};

export type ProductId = {
  _id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  category?: string;
  properties?: { key: string; value: string }[];
};

// ====== CART PARAMS

export type CartItem = {
  product: Product;
  quantity: number;
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  name: string;
  properties: { key: string; value: string[] }[];
};

export type categoryId = {
  _id?: string;
  name?: string;
  properties?: { key: string; value: string[] }[];
};

export type categoryProps = {
  key: string;
  value: string[];
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  totalAmount: string;
  items: { id: string; price: string; quantity: number }[];
  buyerId: string;
  address: {
    street: string;
    postalcode: string;
    city: string;
  };
};

export type CreateOrderParams = {
  stripeId: string;
  items: [{ id: string; quantity: number }];
  buyerId: string;
  totalAmount: string;
  address: {
    street: string;
    postalcode: string;
    city: string;
  };
  createdAt: Date;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
