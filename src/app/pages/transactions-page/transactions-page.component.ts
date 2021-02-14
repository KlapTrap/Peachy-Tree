import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmTransferModalContentComponent } from 'src/app/components/confirm-transfer-modal-content/confirm-transfer-modal-content.component';
import {
  MakeTransactionPanelComponent,
  TransferRequest,
} from 'src/app/components/make-transaction-panel/make-transaction-panel.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  @ViewChild('transactionPanel')
  transactionPanel: MakeTransactionPanelComponent;
  public currency = this.accountService.currancySymbol;
  public balance$ = this.accountService.balance$;
  public transfers$ = this.accountService.transfers$;
  public selectedAccountName = this.accountService.name;

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

  public makeTransfer({ to, amount }: TransferRequest): void {
    this.transactionPanel.reset();
    this.accountService.makeTransfer(to, amount);
  }

  public search(search: string): void {
    this.accountService.search(search);
  }

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {}
}
