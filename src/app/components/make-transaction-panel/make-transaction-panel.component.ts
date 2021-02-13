import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrasactionValidators } from 'src/app/validators/transaction.validators';
export interface TransferRequest {
  from: string;
  to: string;
  amount: number;
}
@Component({
  selector: 'app-make-transaction-panel',
  templateUrl: './make-transaction-panel.component.html',
  styleUrls: ['./make-transaction-panel.component.scss'],
})
export class MakeTransactionPanelComponent {
  public currency$$ = new ReplaySubject<string>();
  public form = this.buildFormObject();

  private currentAccountName: string;
  private accountName$$ = new ReplaySubject<string>();
  private accountBalance$$ = new ReplaySubject<number>();

  public currentAccountMessage$ = this.buildBalanceMessageObservable(
    this.accountName$$,
    this.currency$$,
    this.accountBalance$$
  );

  constructor(private formBuilder: FormBuilder) {}

  @Input() set accountName(accountName: string) {
    this.currentAccountName = accountName;
    this.accountName$$.next(accountName);
  }

  @Input() set accountBalance(accountBalance: number) {
    this.accountBalance$$.next(accountBalance);
    this.form.controls.amount.setValidators([
      Validators.required,
      Validators.min(1),
      TrasactionValidators.balanceReduction(accountBalance, -500),
    ]);
  }

  @Input() set currency(currency: '£' | '$' | '€') {
    this.currency$$.next(currency);
  }

  @Output() transfer = new EventEmitter<TransferRequest>();
  public reset(): void {
    this.form.reset();
  }
  public makeTransferRequest(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.transfer.emit({
        from: this.currentAccountName,
        ...this.form.getRawValue(),
      });
    }
  }

  private buildBalanceString(currency: string, balance: number): string {
    return `${currency} ${balance}`;
  }

  private buildBalancePlaceholderString(
    accountName: string,
    currency: string,
    balance: number
  ): string {
    const balanceString = this.buildBalanceString(currency, balance);
    return `${accountName}: ${balanceString}`;
  }

  private buildBalanceMessageObservable(
    accountName$: Observable<string>,
    currency$: Observable<string>,
    accountBalance$: Observable<number>
  ): Observable<string> {
    return combineLatest([accountName$, currency$, accountBalance$]).pipe(
      map(([accountName, currency, balance]) =>
        this.buildBalancePlaceholderString(accountName, currency, balance)
      )
    );
  }

  private buildFormObject(): FormGroup {
    return this.formBuilder.group({
      to: this.formBuilder.control('', Validators.required),
      amount: this.formBuilder.control('', Validators.required),
    });
  }
}
