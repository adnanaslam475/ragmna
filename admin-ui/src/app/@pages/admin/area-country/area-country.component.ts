import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-area-country',
  templateUrl: './area-country.component.html',
  styleUrls: ['./area-country.component.css']
})
export class AreaCountryComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    titlear: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  currentId: number = 0;
  countryList: any = [];
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getCountryListData();
  }
  setForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      titlear: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getCountryListData() {
    this.adminService.getCountryList().subscribe((data: any) => {
      if (data && data.success) {
        this.countryList = data['items'];
      }
    });
  }
  openModel(data: any, id: number) {
    this.setForm();
    this.currentId = id;
    if (id > 0) {
      let _existingData = this.countryList.find((f: any) => f.id === id);
      this.form.patchValue({
        title: _existingData['title'],
        titlear: _existingData['title_ar'],
      });
    }
    this.modalService.open(data, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.isloading = true;

    let _reqbody = {
      title: this.form.value.title,
      title_ar: this.form.value.titlear,
      id: this.currentId,
    };
    if (this.currentId > 0) {
      this.adminService.updateCountry(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getCountryListData();
          this.currentId = 0;
        } else {
          this.toastr.error(data.message);
        }
      });
    } else {
      this.adminService.saveCountry(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getCountryListData();
          this.currentId = 0;
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
  deleteRecord(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        let _reqbody = {
          id: id,
        };
        this.adminService.deleteCountry(_reqbody).subscribe((data: any) => {
          if (data && data.success) {
            this.toastr.success(data.message);
            this.getCountryListData();
          } else {
            this.toastr.error(data.message);
          }
        });
      } else {
      }
    });
  }

}
