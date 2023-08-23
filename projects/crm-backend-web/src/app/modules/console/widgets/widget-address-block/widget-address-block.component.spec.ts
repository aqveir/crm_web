import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAddressBlockComponent } from './widget-address-block.component';

describe('WidgetAddressBlockComponent', () => {
  let component: WidgetAddressBlockComponent;
  let fixture: ComponentFixture<WidgetAddressBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetAddressBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAddressBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
