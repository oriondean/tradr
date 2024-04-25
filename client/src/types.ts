export const enum Action {
  BID = 'BID',
  ASK = 'ASK',
}

export interface Order {
  quantity: number;
  price: number;
  action: Action;
  account: String;
};

export const API_ROOT: string = 'http://localhost:8080'
