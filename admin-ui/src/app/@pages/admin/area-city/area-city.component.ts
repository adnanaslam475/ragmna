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
  selector: 'app-area-city',
  templateUrl: './area-city.component.html',
  styleUrls: ['./area-city.component.css'],
})
export class AreaCityComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    titlear: new FormControl(''),
    regionid: new FormControl(''),
    isrestricted: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  currentId: number = 0;
  regionList: any = [];
  regionTempList: any = [];
  cityList: any = [];
  countryList: any = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getRegionList();
    this.getCityListData();
    this.getCountryListData();
  }
  setForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      titlear: ['', Validators.required],
      regionid: ['', Validators.required],
      countryid: ['', Validators.required],
      isrestricted: [''],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getRegionList() {
    this.adminService.getregionList().subscribe((data: any) => {
      if (data && data.success) {
        this.regionTempList = data['items'];
      }
    });
  }
  getCityListData() {
    this.adminService.getCityList().subscribe((data: any) => {
      if (data && data.success) {
        this.cityList = data['items'];
      }
    });
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
      let _existingData = this.cityList.find((f: any) => f.id === id);
      this.form.patchValue({
        title: _existingData['title'],
        titlear: _existingData['title_ar'],
        regionid: _existingData['fk_region_id'],
        countryid: _existingData['fk_country_id'],
        isrestricted: _existingData['isrestricted'],
      });
      this.regionList = this.regionTempList.filter(
        (f: any) => f.fk_country_id === this.form.value.countryid
      );
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
      regionid: this.form.value.regionid,
      countryid: this.form.value.countryid,
      isrestricted: this.form.value.isrestricted ? 1 : 0,
      id: this.currentId,
    };
    if (this.currentId > 0) {
      this.adminService.updateCity(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getCityListData();
          this.currentId = 0;
        } else {
          this.toastr.error(data.message);
        }
      });
    } else {
      this.adminService.saveCity(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getCityListData();
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
        this.adminService.deleteCity(_reqbody).subscribe((data: any) => {
          if (data && data.success) {
            this.toastr.success(data.message);
            this.getCityListData();
          } else {
            this.toastr.error(data.message);
          }
        });
      } else {
      }
    });
  }
  getRegionByCountry() {
   
    this.regionList = this.regionTempList.filter(
      (f: any) => f.fk_country_id == this.form.value.countryid
    );
    console.log(this.regionList);
  }
}
