import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CreditDebitIndicator, Transfer } from 'src/app/types/transfer.type';

@Component({
  selector: 'app-transfer-list-item',
  templateUrl: './transfer-list-item.component.html',
  styleUrls: ['./transfer-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferListItemComponent {
  @Input() transfer: Transfer;

  public buildAmountString(transfer: Transfer): string {
    const { currencySymbol, transaction } = transfer;
    const { amount } = transaction.amountCurrency;
    const { creditDebitIndicator } = transaction;
    if (creditDebitIndicator === CreditDebitIndicator.debit) {
      return `${currencySymbol} -${amount}`;
    } else {
      return `${currencySymbol} ${amount}`;
    }
  }
}
