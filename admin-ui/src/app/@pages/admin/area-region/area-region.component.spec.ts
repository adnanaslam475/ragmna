import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaRegionComponent } from './area-region.component';

describe('AreaRegionComponent', () => {
  let component: AreaRegionComponent;
  let fixture: ComponentFixture<AreaRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaRegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
