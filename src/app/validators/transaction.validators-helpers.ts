export function validBalanceReduction(
  balance: number,
  reductionAmount: number,
  minimumAllowedBalance: number
): boolean {
  if (reductionAmount < 1) {
    return true;
  }
  const expectedpostTransactionBalance = balance - reductionAmount;
  return expectedpostTransactionBalance > minimumAllowedBalance;
}
