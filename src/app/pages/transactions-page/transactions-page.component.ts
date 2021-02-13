import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmTransferModalContentComponent } from 'src/app/components/confirm-transfer-modal-content/confirm-transfer-modal-content.component';
import {
  MakeTransactionPanelComponent,
  TransferRequest,
} from 'src/app/components/make-transaction-panel/make-transaction-panel.component';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  @ViewChild('transactionPanel')
  transactionPanel: MakeTransactionPanelComponent;
  public currency = '€';
  public balance = 3036.53;
  public selectedAccountName = 'My Personal Account';

  public showConfirmModal(request: TransferRequest): void {
    const initialState = {
      to: request.to,
      amount: request.amount,
      currency: this.currency,
    };
    const modal = this.modalService.show(ConfirmTransferModalContentComponent, {
      initialState,
    });
    modal.content.makeTransfer.subscribe((transfer: boolean) => {
      if (transfer) {
        this.makeTransfer(request);
      }
    });
  }

  public makeTransfer(request: TransferRequest): void {
    console.log(request);
    this.transactionPanel.reset();
  }

  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {}
}
