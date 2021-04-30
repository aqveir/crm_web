import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSubheaderComponent } from './widget-subheader.component';

describe('WidgetSubheaderComponent', () => {
  let component: WidgetSubheaderComponent;
  let fixture: ComponentFixture<WidgetSubheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSubheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
