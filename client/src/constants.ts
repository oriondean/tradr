export const enum Action {
  BID = 'BID',
  ASK = 'ASK',
}

export type Sell = {
  quantity: number;
  price: number;
  action: Action;
  account: String;
  initialQuantity: number;
};

export const API_ROOT: string = 'http://localhost:8080'
