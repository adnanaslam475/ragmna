import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCountryComponent } from './area-country.component';

describe('AreaCountryComponent', () => {
  let component: AreaCountryComponent;
  let fixture: ComponentFixture<AreaCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
