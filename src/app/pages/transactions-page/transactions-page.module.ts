import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsPageRoutingModule } from './transactions-page-routing.module';
import { TransactionsPageComponent } from './transactions-page.component';
import { PageWrapperModule } from 'src/app/components/page-wrapper/page-wrapper.module';
import { CardModule } from 'src/app/components/card/card.module';
import { MakeTransactionPanelModule } from 'src/app/components/make-transaction-panel/make-transaction-panel.module';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmTransferModalContentModule } from 'src/app/components/confirm-transfer-modal-content/confirm-transfer-modal-content.module';
import { TransferListModule } from 'src/app/components/transfer-list/transfer-list.module';

@NgModule({
  declarations: [TransactionsPageComponent],
  providers: [BsModalService],
  imports: [
    CommonModule,
    TransactionsPageRoutingModule,
    ModalModule.forChild(),
    PageWrapperModule,
    CardModule,
    MakeTransactionPanelModule,
    TransferListModule,
    ConfirmTransferModalContentModule,
  ],
})
export class TransactionsPageModule {}
