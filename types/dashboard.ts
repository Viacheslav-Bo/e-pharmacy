export interface DashboardStatistics {
  products: number;
  suppliers: number;
  customers: number;
}

export interface RecentCustomer {
  _id: string;
  image?: string;
  photo?: string;
  name: string;
  email: string;
  spent: number | string;
}

export type TransactionType = "Income" | "Expense" | "Error";

export interface IncomeExpenseEntry {
  _id: string;
  name: string;
  amount: number | string;
  type: TransactionType;
  createdAt?: string;
}

export interface DashboardResponse {
  stats: DashboardStatistics;
  recentCustomers: RecentCustomer[];
  transactions: IncomeExpenseEntry[];
}
