import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAddressNewContactComponent } from './tab-address-new-contact.component';

describe('TabAddressNewContactComponent', () => {
  let component: TabAddressNewContactComponent;
  let fixture: ComponentFixture<TabAddressNewContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAddressNewContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAddressNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
