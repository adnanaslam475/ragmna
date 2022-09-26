import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCalComponent } from './property-cal.component';

describe('PropertyCalComponent', () => {
  let component: PropertyCalComponent;
  let fixture: ComponentFixture<PropertyCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyCalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
