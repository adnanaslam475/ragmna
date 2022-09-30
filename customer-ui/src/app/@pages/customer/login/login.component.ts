import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageItem } from 'src/app/@core/utils';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  isloading: boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private custServices: CustomerService
  ) {}

  ngOnInit(): void {}
  setForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isloading = true;
    let _data = {
      email: this.form.value.username,
      password: this.form.value.password,
    };
    this.custServices.signIn(_data).subscribe(
      (data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          localStorage.setItem(StorageItem.Auth, data.token);
          this.router.navigate(['/']);
        } else {
          this.toastr.error(data.message);
        }
      },
      (err: any) => {
        console.log(err);
        this.toastr.error('something went wrong');
      }
    );
  }
}
