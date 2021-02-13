import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TransactionsPageComponent } from './transactions-page.component';

describe('TransactionsPageComponent', () => {
  let component: TransactionsPageComponent;
  let fixture: ComponentFixture<TransactionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsPageComponent],
      imports: [ModalModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
