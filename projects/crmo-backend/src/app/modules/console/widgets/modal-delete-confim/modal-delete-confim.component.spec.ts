import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteConfimComponent } from './modal-delete-confim.component';

describe('ModalDeleteConfimComponent', () => {
  let component: ModalDeleteConfimComponent;
  let fixture: ComponentFixture<ModalDeleteConfimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteConfimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteConfimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
