import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Transfer } from 'src/app/types/transfer.type';
const currencyCodeMap = {
  EUR: '€',
};
@Component({
  selector: 'app-transfer-list-item',
  templateUrl: './transfer-list-item.component.html',
  styleUrls: ['./transfer-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferListItemComponent implements OnInit {
  @Input() transfer: Transfer;
  private months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public mapCurrencyCodeToSign(code: string): string {
    return currencyCodeMap[code] || code;
  }

  public getDateString(date: string | number): string {
    const dateObject = new Date(date);
    const monthString = this.months[dateObject.getMonth()];
    const day = dateObject.getDate();
    return `${monthString}. ${day}`;
  }

  public getTransactionTypeColor(date: string | number): string {
    const dateObject = new Date(date);
    const monthString = this.months[dateObject.getMonth()];
    const day = dateObject.getDate();
    return `${monthString}. ${day}`;
  }

  public buildAmountString(transfer: Transfer): string {
    const { currencyCode, amount } = transfer.transaction.amountCurrency;
    const prepend = this.mapCurrencyCodeToSign(currencyCode);
    if (transfer.transaction.creditDebitIndicator === 'DBIT') {
      return `${prepend} -${amount}`;
    } else {
      return `${prepend} ${amount}`;
    }
  }

  ngOnInit(): void {}
}
