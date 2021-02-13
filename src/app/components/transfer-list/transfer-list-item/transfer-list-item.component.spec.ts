import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferListItemComponent } from './transfer-list-item.component';

describe('TransferListItemComponent', () => {
  let component: TransferListItemComponent;
  let fixture: ComponentFixture<TransferListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
