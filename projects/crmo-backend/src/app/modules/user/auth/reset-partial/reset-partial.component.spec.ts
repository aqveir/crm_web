import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPartialComponent } from './reset-partial.component';

describe('ResetPartialComponent', () => {
  let component: ResetPartialComponent;
  let fixture: ComponentFixture<ResetPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
