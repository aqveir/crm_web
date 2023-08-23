import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmLibComponent } from './crm-lib.component';

describe('CrmLibComponent', () => {
  let component: CrmLibComponent;
  let fixture: ComponentFixture<CrmLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmLibComponent]
    });
    fixture = TestBed.createComponent(CrmLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
