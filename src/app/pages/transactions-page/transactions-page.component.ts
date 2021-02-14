import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmTransferModalContentComponent } from 'src/app/components/confirm-transfer-modal-content/confirm-transfer-modal-content.component';
import {
  MakeTransactionPanelComponent,
  TransferRequest,
} from 'src/app/components/make-transaction-panel/make-transaction-panel.component';
import { AccountService } from 'src/app/services/account.service';
import { mockTransfers } from 'src/vendor/bb-ui/mock-data/transactions';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  @ViewChild('transactionPanel')
  transactionPanel: MakeTransactionPanelComponent;

  public minimumBalance = this.accountService.minimumBalance;
  public currencySymbol = this.accountService.currencySymbol;
  public balance$ = this.accountService.balance$;
  public transfers$ = this.accountService.transfers$;
  public selectedAccountName = this.accountService.name;

  public showConfirmModal(request: TransferRequest): void {
    const initialState = {
      to: request.to,
      amount: request.amount,
      currencySymbol: this.currencySymbol,
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
    this.accountService.makeOnlineTransfer(
      to,
      amount,
      this.accountService.currencyCode
    );
  }

  public search(search: string): void {
    this.accountService.search(search);
  }

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.getTransfers();
  }
}
