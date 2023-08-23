import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPaymentmethodComponent } from './modal-add-paymentmethod.component';

describe('ModalAddPaymentmethodComponent', () => {
  let component: ModalAddPaymentmethodComponent;
  let fixture: ComponentFixture<ModalAddPaymentmethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddPaymentmethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddPaymentmethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
