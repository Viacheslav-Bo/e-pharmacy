export interface Supplier {
  _id: string;
  name: string;
  address: string;
  suppliers: string;
  date?: string;
  amount: number | string;
  status: string;
}

export type SuppliersResponse = {
  suppliers: Supplier[];
  totalPages: number;
  currentPage?: number;
  totalItems?: number;
};
