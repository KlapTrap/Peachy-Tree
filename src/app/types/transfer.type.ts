export interface Transfer {
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
