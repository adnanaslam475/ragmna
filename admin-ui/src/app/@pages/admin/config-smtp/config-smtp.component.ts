import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-config-smtp',
  templateUrl: './config-smtp.component.html',
  styleUrls: ['./config-smtp.component.css'],
})
export class ConfigSmtpComponent implements OnInit {
  form: FormGroup = new FormGroup({
    host: new FormControl(''),
    port: new FormControl(''),
    secure: new FormControl(''),
    username: new FormControl(''),
    pwd: new FormControl(''),
    fromemail: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  currentId: number = 0;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getSMTPConfigData();
  }
  setForm() {
    this.form = this.formBuilder.group({
      host: ['', Validators.required],
      port: ['', Validators.required],
      secure: ['', Validators.required],
      username: ['', Validators.required],
      pwd: ['', Validators.required],
      fromemail: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getSMTPConfigData() {
    this.adminService.getSMTPConfig().subscribe((data: any) => {
      if (data && data.success) {
        let _data = data['items'][0];
        
        this.currentId = _data['id'];
        this.form.patchValue({
          host: _data['host'],
          port: _data['port'],
          secure: _data['secure'],
          username: _data['username'],
          pwd: _data['pwd'],
          fromemail: _data['from_email'],
        });
      }
    });
  }
  submitData() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.isloading = true;
      let _reqbody = {
        id: this.currentId,
        host: this.form.value.host,
        port: this.form.value.port,
        secure: this.form.value.secure,
        username: this.form.value.username,
        pwd: this.form.value.pwd,
        fromemail: this.form.value.fromemail,
      };
      this.adminService.updateSMTPConfig(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.getSMTPConfigData();
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
}
