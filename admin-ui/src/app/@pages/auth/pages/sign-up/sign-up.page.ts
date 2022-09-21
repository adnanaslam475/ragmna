import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Isignup } from 'src/app/@core/shared/Isignup';
import { ROUTER_UTILS } from 'src/app/@core/utils/router.utils';
import Validation from 'src/app/@core/utils/validation';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.css'],
})
export class SignUpPage implements OnInit {
  ispaymentpageEnable: boolean = false;
  signUp: Isignup = <Isignup>{};
  form: FormGroup = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    contact: new FormControl(''),
    confirmPassword: new FormControl(''),
    // cardnumber: new FormControl(''),
    // cardname: new FormControl(''),
    // cardexp: new FormControl(''),
    // cardcvv: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  showP: boolean = false;
  showC: boolean = false;
  showclass1: string = '<i class="bx bx-hide"></i>';
  showclass2: string = '<i class="bx bx-hide"></i>';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.setForm();
    }, 1000);
  }
  openPaymentPage() {
    this.ispaymentpageEnable = true;
  }
  setForm() {
    this.form = this.formBuilder.group(
      {
        fname: ['', Validators.required],
        lname: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        contact: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        // cardnumber: [
        //   '',
        //   [
        //     Validators.required,
        //     Validators.minLength(12),
        //     Validators.maxLength(20),
        //   ],
        // ],
        // cardname: ['', Validators.required],
        // cardexp: ['', Validators.required],
        // cardcvv: [
        //   '',
        //   [
        //     Validators.required,
        //     Validators.minLength(2),
        //     Validators.maxLength(4),
        //   ],
        //],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  password(type: string) {
    switch (type) {
      case 'P':
        this.showP = !this.showP;

        if (this.showP) {
          this.showclass1 = '<i class="bx bx-show"></i>';
        } else {
          this.showclass1 = '<i class="bx bx-hide"></i>';
        }
        break;
      case 'C':
        this.showC = !this.showC;

        if (this.showC) {
          this.showclass2 = '<i class="bx bx-show"></i>';
        } else {
          this.showclass2 = '<i class="bx bx-hide"></i>';
        }
        break;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    // this.isloading = true;
    // this.signUp.fname = this.form.value.fname;
    // this.signUp.lname = this.form.value.lname;
    // this.signUp.username = this.form.value.email;
    // this.signUp.password = this.form.value.password;
    // this.signUp.contact = this.form.value.contact;
    // this.signUp.pckg = 'PROFESSIONAL';
    // if (
    //   sessionStorage.getItem('selectedpackage') &&
    //   sessionStorage.getItem('selectedpackage') != null &&
    //   sessionStorage.getItem('selectedpackage') != undefined
    // ) {
    //   this.signUp.pckg = sessionStorage.getItem('selectedpackage')!.toString();
    // }
    // this.signUp.ispaid = 0;

    // this.authService.signUpCreate(this.signUp).subscribe((data: any) => {
    //   this.isloading = false;
    //   if (data.success) {
    //     this.toastr.success('Registration successfully', 'Registration', {
    //       timeOut: 2000,
    //     });

    //     sessionStorage.setItem('tempemail', this.signUp.username);
    //     localStorage.setItem('tempid', data['data']['insertId']);
    //     localStorage.setItem('pckg', this.signUp.pckg);
    //     this.router.navigate(['auth/' + ROUTER_UTILS.config.auth.planpurchase]);
    //   } else {
    //     this.toastr.error(data.message, 'Registration');
    //   }
    // });
  }
  onClickSignIn() {
    this.router.navigate(['auth/' + ROUTER_UTILS.config.auth.signIn]);
  }
}
