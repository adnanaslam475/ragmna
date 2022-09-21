import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPricingComponent } from './building-pricing.component';

describe('BuildingPricingComponent', () => {
  let component: BuildingPricingComponent;
  let fixture: ComponentFixture<BuildingPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
