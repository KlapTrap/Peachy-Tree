import { Component, Input } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-make-transaction-panel',
  templateUrl: './make-transaction-panel.component.html',
  styleUrls: ['./make-transaction-panel.component.scss'],
})
export class MakeTransactionPanelComponent {
  public currency$$ = new ReplaySubject<string>();

  private currentBalance: number;
  private accountName$$ = new ReplaySubject<string>();
  private accountBalance$$ = new ReplaySubject<number>();

  public currentAccountMessage$ = this.buildBalanceMessageObservable(
    this.accountName$$,
    this.currency$$,
    this.accountBalance$$
  );

  @Input() set accountName(accountName: string) {
    this.accountName$$.next(accountName);
  }
  @Input() set accountBalance(accountBalance: number) {
    this.currentBalance = accountBalance;
    this.accountBalance$$.next(accountBalance);
  }
  @Input() set currency(currency: '£' | '$' | '€') {
    this.currency$$.next(currency);
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
}
