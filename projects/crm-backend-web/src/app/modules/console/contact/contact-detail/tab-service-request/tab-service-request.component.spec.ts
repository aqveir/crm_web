import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabServiceRequestComponent } from './tab-service-request.component';

describe('TabServiceRequestComponent', () => {
  let component: TabServiceRequestComponent;
  let fixture: ComponentFixture<TabServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabServiceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
