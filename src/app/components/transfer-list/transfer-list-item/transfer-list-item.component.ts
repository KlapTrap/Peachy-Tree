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
    console.log(code);
    return currencyCodeMap[code] || code;
  }

  public getDateString(date: Date): string {
    const monthString = this.months[date.getMonth()];
    const day = date.getDate();
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
