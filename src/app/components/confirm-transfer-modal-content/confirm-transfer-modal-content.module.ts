import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmTransferModalContentComponent } from './confirm-transfer-modal-content.component';

const exports = [ConfirmTransferModalContentComponent];

@NgModule({
  declarations: exports,
  exports,
  imports: [CommonModule],
})
export class ConfirmTransferModalContentModule {}
