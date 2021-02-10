import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper.component';
import { BbUIModule } from 'src/vendor/bb-ui/bb-ui.module';

const exports = [PageWrapperComponent];

@NgModule({
  exports,
  declarations: exports,
  imports: [CommonModule, BbUIModule],
})
export class PageWrapperModule {}
