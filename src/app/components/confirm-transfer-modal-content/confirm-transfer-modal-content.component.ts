import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-transfer-modal-content',
  templateUrl: './confirm-transfer-modal-content.component.html',
  styleUrls: ['./confirm-transfer-modal-content.component.scss'],
})
export class ConfirmTransferModalContentComponent implements OnDestroy {
  public to: string;
  public amount: number;
  public currency: string;
  public makeTransfer = new EventEmitter<boolean>();

  public confirmTransfer(): void {
    this.emitTransferMessage(true);
  }

  public cancelTransfer(): void {
    this.emitTransferMessage();
  }

  private emitTransferMessage(transfer = false): void {
    this.makeTransfer.emit(transfer);
    this.makeTransfer.complete();
    this.bsModalRef.hide();
  }

  ngOnDestroy(): void {
    this.emitTransferMessage();
  }

  constructor(public bsModalRef: BsModalRef) {}
}
