import { TestBed } from '@angular/core/testing';
import { first, skip } from 'rxjs/operators';
import {
  CreditDebitIndicator,
  PreProcessTransfer,
  Transfer,
} from '../types/transfer.type';

import { AccountService } from './account.service';

function getSearchTestTransfer(name: string): PreProcessTransfer {
  return {
    categoryCode: '',
    dates: {
      valueDate: '',
    },
    merchant: {
      accountNumber: '',
      name,
    },
    transaction: {
      amountCurrency: {
        amount: '1',
        currencyCode: '',
      },
      creditDebitIndicator: '',
      type: '',
    },
  };
}

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update balance on transfer', (done) => {
    const initBalance = 500;
    const transferAmount = 200;
    service.setBalance(initBalance);
    service.balance$.pipe(skip(1), first()).subscribe((balance) => {
      expect(balance).toBe(initBalance - transferAmount);
      done();
    });
    service.makeOnlineTransfer('Anywhere', transferAmount, 'EUR');
  });

  it('should update transfers on transfer', (done) => {
    service.setBalance(500);
    service.setTransfers([getSearchTestTransfer('Hello')]);
    service.transfers$.pipe(skip(1), first()).subscribe((transfers) => {
      const [transfer] = transfers;
      expect(transfers.length).toBe(2);
      expect(transfer.transaction.creditDebitIndicator).toBe(
        CreditDebitIndicator.debit
      );
      expect(transfer.transaction.amountCurrency.amount).toBe(1);
      expect(transfer.transaction.amountCurrency.currencyCode).toBe('EUR');
      expect(transfer.merchant.name).toBe('Anywhere');
      expect(transfer.transaction.type).toBe('Online Transfer');
      done();
    });
    service.makeOnlineTransfer('Anywhere', 1, 'EUR');
  });

  it('should filter on search - no match', (done) => {
    service.setTransfers([getSearchTestTransfer('Hello')]);
    service.transfers$.pipe(skip(1), first()).subscribe((transfer) => {
      expect(transfer.length).toBe(0);
      done();
    });
    service.search('Goodbye');
  });

  it('should filter on search - match', (done) => {
    service.setTransfers([
      getSearchTestTransfer('Hello'),
      getSearchTestTransfer('help'),
      getSearchTestTransfer('nope'),
    ]);
    service.transfers$.pipe(skip(1), first()).subscribe((transfer) => {
      expect(transfer.length).toBe(2);
      done();
    });
    service.search('He');
  });

  it('Adding transaction should while filtering - match', (done) => {
    service.setTransfers([getSearchTestTransfer('Hello')]);
    service.search('He');
    service.makeOnlineTransfer('hello123', 1, 'EUR');
    service.transfers$.pipe(skip(1), first()).subscribe((transfer) => {
      expect(transfer.length).toBe(2);
      done();
    });
  });

  it('Adding transaction should while filtering - no match', (done) => {
    service.setTransfers([getSearchTestTransfer('Hello')]);
    service.search('He');
    service.makeOnlineTransfer('Oopsie', 1, 'EUR');
    service.transfers$.pipe(skip(1), first()).subscribe((transfer) => {
      expect(transfer.length).toBe(1);
      done();
    });
  });
});
