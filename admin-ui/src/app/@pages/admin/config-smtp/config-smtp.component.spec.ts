import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSmtpComponent } from './config-smtp.component';

describe('ConfigSmtpComponent', () => {
  let component: ConfigSmtpComponent;
  let fixture: ComponentFixture<ConfigSmtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigSmtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigSmtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
