import { Component, OnInit } from '@angular/core';
import { TransferRequest } from 'src/app/components/make-transaction-panel/make-transaction-panel.component';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  public balance = 3036.53;
  public selectedAccountName = 'My Personal Account';
  public showConfirmModal(request: TransferRequest): void {
    console.log(request);
  }
  constructor() {}

  ngOnInit(): void {}
}
