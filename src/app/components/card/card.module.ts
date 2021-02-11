import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';

const exports = [CardComponent, CardHeaderComponent];

@NgModule({
  exports,
  declarations: exports,
  imports: [CommonModule],
})
export class CardModule {}
