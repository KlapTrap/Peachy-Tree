export interface Transfer {
  date: Date;
  currencySymbol: string;
  categoryCode: string;
  dates: {
    valueDate: number | string;
  };
  transaction: {
    amountCurrency: {
      amount: number | string;
      currencyCode: string;
    };
    type: string;
    creditDebitIndicator: CreditDebitIndicator | string;
  };
  merchant: {
    name: string;
    accountNumber: string;
  };
}
export type PreProcessTransfer = Omit<Transfer, 'date' | 'currencySymbol'>;
export enum CreditDebitIndicator {
  credit = 'CRDT',
  debit = 'DBIT',
}
