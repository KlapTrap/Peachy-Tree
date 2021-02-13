import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ConfirmTransferModalContentComponent } from './confirm-transfer-modal-content.component';
import { ConfirmTransferModalContentModule } from './confirm-transfer-modal-content.module';

describe('ConfirmTransferModalContentComponent', () => {
  let component: ConfirmTransferModalContentComponent;
  let fixture: ComponentFixture<ConfirmTransferModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmTransferModalContentModule, ModalModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTransferModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
