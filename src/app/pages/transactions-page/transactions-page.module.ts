import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsPageRoutingModule } from './transactions-page-routing.module';
import { TransactionsPageComponent } from './transactions-page.component';
import { PageWrapperModule } from 'src/app/components/page-wrapper/page-wrapper.module';
import { CardModule } from 'src/app/components/card/card.module';
import { MakeTransactionPanelModule } from 'src/app/components/make-transaction-panel/make-transaction-panel.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmTransferModalContentModule } from 'src/app/components/confirm-transfer-modal-content/confirm-transfer-modal-content.module';

@NgModule({
  declarations: [TransactionsPageComponent],
  providers: [BsModalService],
  imports: [
    CommonModule,
    TransactionsPageRoutingModule,
    PageWrapperModule,
    CardModule,
    MakeTransactionPanelModule,
    ConfirmTransferModalContentModule,
  ],
})
export class TransactionsPageModule {}
