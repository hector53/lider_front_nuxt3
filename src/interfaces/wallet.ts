export interface detailsWire {
  payee_name?: string;

  type_payee?: string;

  address?: string;

  app_or_suite?: string;

  bank_name?: string;

  routing_number?: string;
}

export interface WalletAdmin{
  _id:string,
  type: number,
  wallet: string,
  confirm_wallet: string,
  detailsWire: {
    payee_name: string,
    type_payee: string,
    address: string,
    apt_or_suite: string,
    bank_name: string,
    routing_number: string,
  },
  detailsCrypto: {
    currency: string,
    red: string,
  },
  typeEwallet: string,
  active: boolean,
  created: string;
  user: string,
  site: string,
}

export interface Wallet{
  _id:string,
  type: number,
  wallet: string | null,
  txid: string,
  confirm_wallet: string,
  detailsWire: {
    payee_name: string,
    type_payee: string,
    address: string,
    apt_or_suite: string,
    bank_name: string,
    routing_number: string,
  },
  detailsCrypto: {
    currency: string,
    red: string,
  },
  typeEwallet: string,
  active: boolean,
  created: string;
}

export interface WalletPagination {
  wallets: WalletAdmin[];

  count: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  nextPage: number;

  previousPage: number;
}
