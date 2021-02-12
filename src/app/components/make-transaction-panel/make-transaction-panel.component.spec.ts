import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTransactionPanelComponent } from './make-transaction-panel.component';

describe('MakeTransactionPanelComponent', () => {
  let component: MakeTransactionPanelComponent;
  let fixture: ComponentFixture<MakeTransactionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeTransactionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransactionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
