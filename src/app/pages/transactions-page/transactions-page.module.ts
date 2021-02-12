import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsPageRoutingModule } from './transactions-page-routing.module';
import { TransactionsPageComponent } from './transactions-page.component';
import { PageWrapperModule } from 'src/app/components/page-wrapper/page-wrapper.module';
import { CardModule } from 'src/app/components/card/card.module';
import { MakeTransactionPanelModule } from 'src/app/components/make-transaction-panel/make-transaction-panel.module';

@NgModule({
  declarations: [TransactionsPageComponent],
  imports: [
    CommonModule,
    TransactionsPageRoutingModule,
    PageWrapperModule,
    CardModule,
    MakeTransactionPanelModule,
  ],
})
export class TransactionsPageModule {}
