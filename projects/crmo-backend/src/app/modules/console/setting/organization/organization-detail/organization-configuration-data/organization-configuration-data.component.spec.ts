import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationConfigurationDataComponent } from './organization-configuration-data.component';

describe('OrganizationConfigurationDataComponent', () => {
  let component: OrganizationConfigurationDataComponent;
  let fixture: ComponentFixture<OrganizationConfigurationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationConfigurationDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationConfigurationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
