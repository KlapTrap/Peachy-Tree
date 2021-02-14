import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { map, shareReplay, startWith, take } from 'rxjs/operators';
import { mockTransfers } from 'src/vendor/bb-ui/mock-data/transactions';
import { Transfer, UnDatedTransfer } from '../types/transfer.type';
import { validBalanceReduction } from '../validators/transaction.validators-helpers';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private transferStore = this.addDateToTransfers(mockTransfers.data);
  private transfers$$ = new BehaviorSubject<Transfer[]>(this.transferStore);
  private balance$$ = new BehaviorSubject<number>(1246.32);
  private search$$ = new ReplaySubject<string>();
  public transfers$ = this.buildTransfersObservable();
  public balance$ = this.balance$$.asObservable().pipe(shareReplay(1));

  readonly name = 'My Personal Account';
  readonly currencyCode = 'EUR';
  readonly currancySymbol = '€';
  readonly minimumBalance = -500;

  public search(search: string): void {
    this.search$$.next(search);
  }

  public makeTransfer(to: string, amount: number): void {
    this.balance$.pipe(take(1)).subscribe((balance) => {
      if (validBalanceReduction(balance, amount, this.minimumBalance)) {
        const result = balance - amount;
        this.balance$$.next(+result.toFixed(2));
        this.storeTransfer(to, amount);
      }
    });
  }
  private storeTransfer(to: string, amount: number): void {
    const date = new Date();
    this.transferStore = [
      {
        date,
        categoryCode: '#12a580',
        dates: {
          valueDate: date.getTime(),
        },
        merchant: {
          accountNumber: to,
          name: to,
        },
        transaction: {
          amountCurrency: {
            amount: amount.toString(),
            currencyCode: this.currencyCode,
          },
          type: 'Online Transfer',
          creditDebitIndicator: 'DBIT',
        },
      },
      ...this.transferStore,
    ];
    this.transfers$$.next(this.transferStore);
  }
  private buildTransfersObservable(): Observable<Transfer[]> {
    return combineLatest([
      this.transfers$$.pipe(map((transfers) => this.sortTransfers(transfers))),
      this.search$$.pipe(startWith('')),
    ]).pipe(
      map(([transfers, search]) => this.filterBySearchTerm(transfers, search))
    );
  }

  private filterBySearchTerm(
    transfers: Transfer[],
    searchTerm: string
  ): Transfer[] {
    if (!searchTerm) {
      return transfers;
    }
    return transfers.filter((transfer) =>
      transfer.merchant.name.includes(searchTerm)
    );
  }

  private addDateToTransfers(transfers: UnDatedTransfer[]): Transfer[] {
    return transfers.map((transfer) => ({
      ...transfer,
      date: new Date(transfer.dates.valueDate),
    }));
  }

  private sortTransfers(transfers: Transfer[]): Transfer[] {
    return transfers.sort((a, b) => {
      const aTimestamp = a.date.getTime();
      const bTimestamp = b.date.getTime();
      if (aTimestamp < bTimestamp) {
        return 1;
      }
      if (aTimestamp > bTimestamp) {
        return -1;
      }
      return 0;
    });
  }
  constructor() {}
}
