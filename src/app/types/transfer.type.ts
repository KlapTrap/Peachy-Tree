export interface Transfer {
  date: Date;
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
    creditDebitIndicator: string;
  };
  merchant: {
    name: string;
    accountNumber: string;
  };
}
export type UnDatedTransfer = Omit<Transfer, 'date'>;
