import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmoLibComponent } from './crmo-lib.component';

describe('CrmoLibComponent', () => {
  let component: CrmoLibComponent;
  let fixture: ComponentFixture<CrmoLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmoLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmoLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
