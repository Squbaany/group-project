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
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  properties: { key: string; vals: string }[];
};

export type UpdateProductParams = {
  _id: string;
  name: string;
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
  category: {
    _id: string;
    name: string;
  };
  properties: { key: string; value: string }[];
};

export type ProductId = {
  _id?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  category?: string;
  properties: { key: string; vals: string[] }[];
};

// ====== CART PARAMS

export type CartItem = {
  product: Product;
  quantity: number;
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  name: string;
  properties: { key: string; vals: string[] }[];
};

export type categoryId = {
  _id?: string;
  name?: string;
  properties: { key: string; vals: string[] }[];
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  items: { id: string; quantity: number }[];
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  productId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByProductParams = {
  eventId: string;
  searchString: string;
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
