import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTransactionPanelComponent } from './make-transaction-panel.component';
import { MakeTransactionPanelModule } from './make-transaction-panel.module';

function getSubmitButton(
  fixture: ComponentFixture<MakeTransactionPanelComponent>
): HTMLButtonElement {
  const element = fixture.elementRef.nativeElement as HTMLElement;
  return element.querySelector(
    '[data-test-hook="submitButton"]'
  ) as HTMLButtonElement;
}

function submitForm(
  fixture: ComponentFixture<MakeTransactionPanelComponent>
): void {
  const button = getSubmitButton(fixture);
  button.click();
  fixture.detectChanges();
}

function setFormInputValue(
  fixture: ComponentFixture<MakeTransactionPanelComponent>,
  name: string,
  value: string | number
): void {
  const form = fixture.componentInstance.form;
  form.controls[name].setValue(value);
  fixture.detectChanges();
}

describe('MakeTransactionPanelComponent', () => {
  let component: MakeTransactionPanelComponent;
  let fixture: ComponentFixture<MakeTransactionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeTransactionPanelModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransactionPanelComponent);
    component = fixture.componentInstance;
    component.accountBalance = 500;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit if invalid', () => {
    const spy = spyOn(component.transfer, 'emit');
    submitForm(fixture);
    expect(spy.calls.count()).toBe(0);
  });

  it('should not emit if invalid - to only', () => {
    const spy = spyOn(component.transfer, 'emit');
    setFormInputValue(fixture, 'to', 'abc1234');
    submitForm(fixture);
    expect(spy.calls.count()).toBe(0);
  });

  it('should not emit if invalid - amount only', () => {
    const spy = spyOn(component.transfer, 'emit');
    setFormInputValue(fixture, 'amount', 1);
    submitForm(fixture);
    expect(spy.calls.count()).toBe(0);
  });

  it('should not emit if invalid - invalid transfer amount', () => {
    const spy = spyOn(component.transfer, 'emit');
    setFormInputValue(fixture, 'amount', 100000);
    setFormInputValue(fixture, 'to', 'abc1234');
    submitForm(fixture);
    expect(spy.calls.count()).toBe(0);
  });

  it('should emit if valid', () => {
    const spy = spyOn(component.transfer, 'emit');
    setFormInputValue(fixture, 'amount', 20);
    setFormInputValue(fixture, 'to', 'abc1234');
    submitForm(fixture);
    expect(spy.calls.count()).toBe(1);
  });
});
