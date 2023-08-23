import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceDetailComponent } from './preference-detail.component';

describe('PreferenceDetailComponent', () => {
  let component: PreferenceDetailComponent;
  let fixture: ComponentFixture<PreferenceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
