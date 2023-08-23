import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationConfigurationListComponent } from './organization-configuration-list.component';

describe('OrganizationConfigurationListComponent', () => {
  let component: OrganizationConfigurationListComponent;
  let fixture: ComponentFixture<OrganizationConfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationConfigurationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
