import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMailTemplateListComponent } from './organization-mail-template-list.component';

describe('OrganizationMailTemplateListComponent', () => {
  let component: OrganizationMailTemplateListComponent;
  let fixture: ComponentFixture<OrganizationMailTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationMailTemplateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMailTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
