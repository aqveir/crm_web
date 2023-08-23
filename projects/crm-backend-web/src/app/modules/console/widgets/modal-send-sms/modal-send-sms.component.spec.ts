import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSendSmsComponent } from './modal-send-sms.component';

describe('ModalSendSmsComponent', () => {
  let component: ModalSendSmsComponent;
  let fixture: ComponentFixture<ModalSendSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSendSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSendSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
