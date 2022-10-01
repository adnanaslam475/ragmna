import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZPaginationComponent } from './z-pagination.component';

describe('ZPaginationComponent', () => {
  let component: ZPaginationComponent;
  let fixture: ComponentFixture<ZPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
