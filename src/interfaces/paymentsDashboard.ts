export interface processorPayment {
  name: string;

  identy: string;

  image: string;
}
export interface assignedUserPayment {
  _id: string;
  fullName: string;
  email: string;
}

export interface Payments {
  invoice: string;

  amount: number;

  currency: string;

  assigned_user: assignedUserPayment[];

  processor: processorPayment[];

  receipt_url: string;

  fee: number;

  net_amount: number;

  amount_conversion: number;

  created: string;
}

export interface PaymentsDashboardPagination {
  payments: Payments[];

  count: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  nextPage: number;

  previousPage: number;
}
