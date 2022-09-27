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
  selector: 'app-area-district',
  templateUrl: './area-district.component.html',
  styleUrls: ['./area-district.component.css'],
})
export class AreaDistrictComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    titlear: new FormControl(''),
    cityid: new FormControl(''),
    regionid: new FormControl(''),
    isrestricted: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  currentId: number = 0;
  cityList: any = [];
  citytempList: any = [];
  districtList: any = [];
  regionTempList: any = [];
  regionList: any = [];
  countryList: any = [];
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getCityListData();
    this.getDistrictList();
    this.getRegionList();
    this.getCountryListData();
  }
  setForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      titlear: ['', Validators.required],
      countryid: ['', Validators.required],
      cityid: ['', Validators.required],
      regionid: ['', Validators.required],
      isrestricted: [''],
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
  getDistrictList() {
    this.adminService.getDistrictList().subscribe((data: any) => {
      if (data && data.success) {
        this.districtList = data['items'];
      }
    });
  }
  getCityListData() {
    this.adminService.getCityList().subscribe((data: any) => {
      if (data && data.success) {
        this.citytempList = data['items'];
      }
    });
  }
  getRegionList() {
    this.adminService.getregionList().subscribe((data: any) => {
      if (data && data.success) {
        this.regionTempList = data['items'];
      }
    });
  }
  getRegionByCountry(){
    this.regionList = this.regionTempList.filter(
      (f: any) => f.fk_country_id == this.form.value.countryid
    );
  }
  getCity() {
    this.cityList = this.citytempList.filter(
      (f: any) => f.fk_region_id == this.form.value.regionid
    );
  }
  openModel(data: any, id: number) {
    this.setForm();
    this.currentId = id;
    if (id > 0) {
      let _existingData = this.districtList.find((f: any) => f.id === id);
      this.form.patchValue({
        title: _existingData['title'],
        titlear: _existingData['title_ar'],
        cityid: _existingData['fk_city_id'],
        regionid: _existingData['fk_region_id'],
        countryid: _existingData['fk_country_id'],
        isrestricted: _existingData['isrestricted'],
      });
      this.regionList = this.regionTempList.filter(
        (f: any) => f.fk_country_id == this.form.value.countryid
      );

      this.cityList = this.citytempList.filter(
        (f: any) => f.fk_region_id == this.form.value.regionid
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
      cityid: this.form.value.cityid,
      regionid: this.form.value.regionid,
      countryid: this.form.value.countryid,
      isrestricted: this.form.value.isrestricted ? 1 : 0,
      id: this.currentId,
    };
    if (this.currentId > 0) {
      this.adminService.updateDistrict(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getDistrictList();
          this.currentId = 0;
          this.submitted = false;
          this.cityList = [];
        } else {
          this.toastr.error(data.message);
        }
      });
    } else {
      this.adminService.saveDistrict(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getDistrictList();
          this.currentId = 0;
          this.submitted = false;
          this.cityList = [];
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
        this.adminService.deleteDistrict(_reqbody).subscribe((data: any) => {
          if (data && data.success) {
            this.toastr.success(data.message);
            this.getDistrictList();
          } else {
            this.toastr.error(data.message);
          }
        });
      } else {
      }
    });
  }
}
