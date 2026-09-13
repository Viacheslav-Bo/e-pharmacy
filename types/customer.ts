export interface Customer {
  _id: string;
  image?: string;
  photo?: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}

export interface CustomersResponse {
  customers: Customer[];
  totalPages: number;
  currentPage?: number;
  totalItems?: number;
}
