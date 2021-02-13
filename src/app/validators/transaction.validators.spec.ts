import { FormControl } from '@angular/forms';
import {
  TrasactionValidators,
  TrasactionValidatorsErrors,
} from './transaction.validators';

describe('transaction validators', () => {
  it('balanceReduction validator should error when transaction take balance allow below min', () => {
    const validator = TrasactionValidators.balanceReduction(1, 0);
    const control = new FormControl(2);
    const errors = validator(control);
    expect(errors[TrasactionValidatorsErrors.balanceReduction]).toBe(true);
  });

  it('balanceReduction validator should not error on valid transaction', () => {
    const validator = TrasactionValidators.balanceReduction(10, 0);
    const control = new FormControl(2);
    const errors = validator(control);
    expect(errors).toBe(null);
  });
});
