import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAccessControlComponent } from './tab-access-control.component';

describe('TabAccessControlComponent', () => {
  let component: TabAccessControlComponent;
  let fixture: ComponentFixture<TabAccessControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAccessControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAccessControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
