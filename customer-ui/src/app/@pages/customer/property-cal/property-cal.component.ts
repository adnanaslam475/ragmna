import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-property-cal',
  templateUrl: './property-cal.component.html',
  styleUrls: ['./property-cal.component.css'],
})
export class PropertyCalComponent implements OnInit {
  currentstep: string = 'STEP1';
  quoteno: string = '';
  form: FormGroup = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });
  form2: FormGroup = new FormGroup({
    companyname: new FormControl(''),
    companyaddress: new FormControl(''),
    companyphone: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  constructor(
    private custservice: CustomerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.setForm2();
  }
  setForm() {
    this.form = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: [''],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  setForm2() {
    this.form2 = this.formBuilder.group({
      companyname: ['', Validators.required],
      companyaddress: [''],
      companyphone: [''],
    });
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.form2.controls;
  }
  createNewQuote(type: string) {
    localStorage.setItem('quotetype', type);
    let _reqbody = {
      title: 'Real Estate',
      category: type,
    };
    this.custservice.saveQuoteNumber(_reqbody).subscribe((data: any) => {
      if (data.success) {
        this.quoteno = data.data;
        localStorage.getItem(this.quoteno);
        this.toastr.success('Please continue to fill your information');
        this.currentstep = 'STEP2';
      }
    });
  }
  savePersonalInfo() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let _reqbody = {
      quoteno: this.quoteno,
      fname: this.form.value.fname,
      lname: this.form.value.lname,
      email: this.form.value.email,
      phone: this.form.value.phone,
    };
    this.custservice.savePersonalInfo(_reqbody).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success('Please continue to fill your information');
        this.currentstep = 'STEP3';
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }
  saveCompanyInfo() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let _reqbody = {
      quoteno: this.quoteno,
      companyname: this.form2.value.companyname,
      companyaddress: this.form2.value.companyaddress,
      companyphone: this.form2.value.companyphone,
    };
    this.custservice.saveCompanyInfo(_reqbody).subscribe((data: any) => {
      if (data.success) {
        this.quoteno = data.data;
        this.toastr.success('Please continue for next step');
        this.currentstep = 'STEP2';
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }
}
