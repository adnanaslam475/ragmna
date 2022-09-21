import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDistrictComponent } from './area-district.component';

describe('AreaDistrictComponent', () => {
  let component: AreaDistrictComponent;
  let fixture: ComponentFixture<AreaDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaDistrictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
