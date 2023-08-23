import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProfileNewContactComponent } from './tab-profile-new-contact.component';

describe('TabProfileNewContactComponent', () => {
  let component: TabProfileNewContactComponent;
  let fixture: ComponentFixture<TabProfileNewContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabProfileNewContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabProfileNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
