export interface Product {
  _id: string;
  id: string;
  name: string;
  photo: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}

export type ProductsResponse = Product[];
