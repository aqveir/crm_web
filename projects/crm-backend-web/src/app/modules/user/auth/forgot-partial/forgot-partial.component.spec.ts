import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPartialComponent } from './forgot-partial.component';

describe('ForgotPartialComponent', () => {
  let component: ForgotPartialComponent;
  let fixture: ComponentFixture<ForgotPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
