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
  data: Customer[];
  total: number;
  page: number;
  totalPages: number;
}
