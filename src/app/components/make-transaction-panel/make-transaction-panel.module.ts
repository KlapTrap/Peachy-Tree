import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeTransactionPanelComponent } from './make-transaction-panel.component';
import { CardModule } from '../card/card.module';
import { BbUIModule } from 'src/vendor/bb-ui/bb-ui.module';
const exports = [MakeTransactionPanelComponent];
@NgModule({
  exports,
  declarations: exports,
  imports: [CommonModule, CardModule, BbUIModule],
})
export class MakeTransactionPanelModule {}
