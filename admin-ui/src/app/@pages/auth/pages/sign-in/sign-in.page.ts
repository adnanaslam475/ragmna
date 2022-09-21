import { Component, OnInit, ViewChildren } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Isignin } from 'src/app/@core/shared/Isignup';
import { ROUTER_UTILS } from '../../../../@core/utils/router.utils';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { setItem, StorageItem } from 'src/app/@core/utils';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css'],
})
export class SignInPage implements OnInit {
  submitted = false;
  isloading: boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.setForm();
  }
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
    this.authService.signIn(_data).subscribe(
      (data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.authService.isLoggedIn$.next(true);
          setItem(StorageItem.Auth, data.token);
          this.router.navigate(['/dashboard']);
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
