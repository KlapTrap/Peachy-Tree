import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeTransactionPanelComponent } from './make-transaction-panel.component';
import { CardModule } from '../card/card.module';
const exports = [MakeTransactionPanelComponent];
@NgModule({
  exports,
  declarations: exports,
  imports: [CommonModule, CardModule],
})
export class MakeTransactionPanelModule {}
