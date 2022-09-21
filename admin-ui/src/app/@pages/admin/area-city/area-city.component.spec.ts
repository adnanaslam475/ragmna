import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCityComponent } from './area-city.component';

describe('AreaCityComponent', () => {
  let component: AreaCityComponent;
  let fixture: ComponentFixture<AreaCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
