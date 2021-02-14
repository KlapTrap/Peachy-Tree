import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transfer } from 'src/app/types/transfer.type';
import { mockTransfers } from 'src/vendor/bb-ui/mock-data/transactions';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
})
export class TransferListComponent {
  @Input() transfers: Transfer[];
  @Output() search = new EventEmitter<string>();

  public changeSearch(search: string): void {
    this.search.emit(search);
  }
  constructor() {}
}
