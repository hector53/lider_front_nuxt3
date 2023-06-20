import { Wallet } from "./wallet";

export interface WithdrawUser {
  _id: string;
  
  site: string;

  currency: string;

  wallet: Wallet;

  amount: number;

  status: number;

  user_id: string;

  txid: string;

  created: string;

}

export interface WithdrawsUserPagination {
  withdraws: WithdrawUser[];

  count: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  nextPage: number;

  previousPage: number;
}
