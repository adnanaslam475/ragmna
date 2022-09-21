import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPricingComponent } from './land-pricing.component';

describe('LandPricingComponent', () => {
  let component: LandPricingComponent;
  let fixture: ComponentFixture<LandPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
