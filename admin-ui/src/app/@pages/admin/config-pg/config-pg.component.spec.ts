import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPgComponent } from './config-pg.component';

describe('ConfigPgComponent', () => {
  let component: ConfigPgComponent;
  let fixture: ComponentFixture<ConfigPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
