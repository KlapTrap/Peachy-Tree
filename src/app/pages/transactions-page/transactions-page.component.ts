import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  public balance = 3036.53;
  public selectedAccountName = 'My Personal Account';
  constructor() {}

  ngOnInit(): void {}
}
