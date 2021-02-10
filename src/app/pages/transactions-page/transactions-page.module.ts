import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsPageRoutingModule } from './transactions-page-routing.module';
import { TransactionsPageComponent } from './transactions-page.component';
import { PageWrapperModule } from 'src/app/components/page-wrapper/page-wrapper.module';

@NgModule({
  declarations: [TransactionsPageComponent],
  imports: [CommonModule, TransactionsPageRoutingModule, PageWrapperModule],
})
export class TransactionsPageModule {}
