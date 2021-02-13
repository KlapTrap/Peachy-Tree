import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { validBalanceReduction } from './transaction.validators-helpers';
export enum TrasactionValidatorsErrors {
  balanceReduction = 'balanceReduction',
}
export class TrasactionValidators {
  static balanceReduction(
    balance: number,
    minAllowedBalance: number
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const expectedBalanceValid = validBalanceReduction(
        balance,
        control.value,
        minAllowedBalance
      );

      if (expectedBalanceValid) {
        return null;
      } else {
        return { [TrasactionValidatorsErrors.balanceReduction]: true };
      }
    };
  }
}
