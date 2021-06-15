import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSettingNewContactComponent } from './tab-setting-new-contact.component';

describe('TabSettingNewContactComponent', () => {
  let component: TabSettingNewContactComponent;
  let fixture: ComponentFixture<TabSettingNewContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSettingNewContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSettingNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
