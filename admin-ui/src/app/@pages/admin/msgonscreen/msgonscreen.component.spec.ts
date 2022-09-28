import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgonscreenComponent } from './msgonscreen.component';

describe('MsgonscreenComponent', () => {
  let component: MsgonscreenComponent;
  let fixture: ComponentFixture<MsgonscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgonscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgonscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
