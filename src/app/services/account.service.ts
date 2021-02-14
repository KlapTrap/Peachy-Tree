import { getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { map, shareReplay, startWith, take } from 'rxjs/operators';
import { mockTransfers } from 'src/vendor/bb-ui/mock-data/transactions';
import {
  CreditDebitIndicator,
  Transfer,
  PreProcessTransfer,
} from '../types/transfer.type';
import { validBalanceReduction } from '../validators/transaction.validators-helpers';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private transfers$$ = new BehaviorSubject<Transfer[]>([]);
  private balance$$ = new BehaviorSubject<number>(1353.64);
  private search$$ = new ReplaySubject<string>();
  public transfers$ = this.buildTransfersObservable();
  public balance$ = this.balance$$.asObservable().pipe(shareReplay(1));

  readonly name = 'My Personal Account';
  readonly currencyCode = 'EUR';
  readonly currencySymbol = getCurrencySymbol(this.currencyCode, 'narrow');
  readonly minimumBalance = -500;

  public search(search: string): void {
    this.search$$.next(search);
  }

  public setBalance(newBalance: number): void {
    this.balance$$.next(+newBalance.toFixed(2));
  }

  public setTransfers(transfers: PreProcessTransfer[]): void {
    this.transfers$$.next(
      transfers.map((transfer) => this.processTransfer(transfer))
    );
  }

  public getTransfers(): void {
    this.setTransfers([...mockTransfers.data]);
  }

  public makeOnlineTransfer(
    to: string,
    amount: number,
    currencyCode: string
  ): void {
    this.balance$.pipe(take(1)).subscribe((balance) => {
      if (validBalanceReduction(balance, amount, this.minimumBalance)) {
        this.setBalance(balance - amount);
        this.storeTransfer(to, amount, currencyCode);
      }
    });
  }

  private storeTransfer(
    to: string,
    amount: number,
    currencyCode: string
  ): void {
    const preProcessTransfer = this.buildOnlineTransfer(
      to,
      amount,
      currencyCode
    );
    const processedTransfer = this.processTransfer(preProcessTransfer);
    this.transfers$$.next([processedTransfer, ...this.transfers$$.value]);
  }

  private buildTransfersObservable(): Observable<Transfer[]> {
    return combineLatest([
      this.transfers$$.pipe(map((transfers) => this.sortTransfers(transfers))),
      this.search$$.pipe(startWith('')),
    ]).pipe(
      map(([transfers, search]) => this.filterBySearchTerm(transfers, search)),
      shareReplay(1)
    );
  }

  private filterBySearchTerm(
    transfers: Transfer[],
    searchTerm: string
  ): Transfer[] {
    if (!searchTerm) {
      return transfers;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return transfers.filter((transfer) =>
      transfer.merchant.name.toLowerCase().includes(lowerCaseSearch)
    );
  }

  private processTransfer(transfer: PreProcessTransfer): Transfer {
    return {
      ...transfer,
      currencySymbol: getCurrencySymbol(
        transfer.transaction.amountCurrency.currencyCode,
        'narrow'
      ),
      date: new Date(transfer.dates.valueDate),
    };
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

  private buildOnlineTransfer(
    to: string,
    amount: number,
    currencyCode: string
  ): PreProcessTransfer {
    return {
      categoryCode: '#12a580',
      dates: {
        valueDate: new Date().getTime(),
      },
      merchant: {
        accountNumber: to,
        name: to,
      },
      transaction: {
        amountCurrency: {
          amount,
          currencyCode,
        },
        type: 'Online Transfer',
        creditDebitIndicator: CreditDebitIndicator.debit,
      },
    };
  }
}
