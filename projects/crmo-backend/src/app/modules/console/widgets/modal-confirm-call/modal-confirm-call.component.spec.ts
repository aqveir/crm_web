import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmCallComponent } from './modal-confirm-call.component';

describe('ModalConfirmCallComponent', () => {
  let component: ModalConfirmCallComponent;
  let fixture: ComponentFixture<ModalConfirmCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
