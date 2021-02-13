import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmTransferModalContentComponent } from './confirm-transfer-modal-content.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const exports = [ConfirmTransferModalContentComponent];

@NgModule({
  declarations: exports,
  exports,
  imports: [CommonModule, ModalModule.forChild()],
})
export class ConfirmTransferModalContentModule {}
