import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardActionsComponent } from './card-actions/card-actions.component';

const exports = [CardComponent, CardHeaderComponent, CardActionsComponent];

@NgModule({
  exports,
  declarations: exports,
  imports: [CommonModule],
})
export class CardModule {}
