import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferListComponent } from './transfer-list.component';
import { CardModule } from '../card/card.module';
import { BbUIModule } from 'src/vendor/bb-ui/bb-ui.module';
import { TransferListItemComponent } from './transfer-list-item/transfer-list-item.component';

const exports = [TransferListComponent];
@NgModule({
  declarations: [...exports, TransferListItemComponent],
  exports,
  imports: [CommonModule, CardModule, BbUIModule],
})
export class TransferListModule {}
