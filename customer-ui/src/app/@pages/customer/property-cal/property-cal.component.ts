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
  form3: FormGroup = new FormGroup({
    purposeid: new FormControl(''),
    totalprop: new FormControl(''),
    totaleveneed: new FormControl(''),
  });
  form4: FormGroup = new FormGroup({
    typecd: new FormControl(''),
    region: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    district: new FormControl(''),
    land_size: new FormControl(''),
    building_size: new FormControl(''),
    isrestricted: new FormControl(''),
    purposeid: new FormControl(''),
    totalprop: new FormControl(''),
    totaleveneed: new FormControl(''),
    districtrestrictedval: new FormControl(''),
    cityrestrictedval: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  purposeList: any = [];
  countryList: any = [];
  regionList: any = [];
  regionTempList: any = [];
  cityList: any = [];
  cityTempList: any = [];
  districtList: any = [];
  districtTempList: any = [];
  propertyList: any = [];
  iscityrestricted: boolean = false;
  isdistrictrestricted: boolean = false;
  payAmount: any = 0;
  baseUrl: string = '';
  constructor(
    private custservice: CustomerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.setForm2();
    // this.setForm3();
    this.setForm4();
    this.getPurpose();
    this.getCity();
    this.getCountry();
    this.getDistrict();
    this.getRegion();
    const parsedUrl = new URL(window.location.href);
    this.baseUrl = parsedUrl.origin;
   
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
  // setForm3() {
  //   this.form3 = this.formBuilder.group({
  //     purposeid: ['', Validators.required],
  //     totalprop: ['', Validators.required],
  //     totaleveneed: ['', Validators.required],
  //   });
  // }
  // get f3(): { [key: string]: AbstractControl } {
  //   return this.form3.controls;
  // }
  setForm4() {
    this.form4 = this.formBuilder.group({
      typecd: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      land_size: ['0', Validators.required],
      building_size: ['0', Validators.required],
      isrestricted: ['0', Validators.required],
      purposeid: ['', Validators.required],
      totalprop: ['', Validators.required],
      totaleveneed: ['', Validators.required],
      districtrestrictedval: ['0'],
      cityrestrictedval: ['0'],
    });
  }
  get f4(): { [key: string]: AbstractControl } {
    return this.form4.controls;
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
    if (this.form2.invalid) {
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
        this.toastr.success('Please continue for next step');
        this.currentstep = 'STEP5';
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }

  saveEvePurposeInfo() {
    this.submitted = true;
    if (this.form3.invalid) {
      return;
    }
    let _reqbody = {
      quoteno: this.quoteno,
      purposeid: this.form3.value.purposeid,
      totalprop: this.form3.value.totalprop,
      totalevalutor: this.form3.value.totaleveneed,
    };
    this.custservice.savePurposeInfo(_reqbody).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success('Please continue for next step');
        this.currentstep = 'STEP5';
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }
  savePropertyInfo() {
    debugger;
    this.submitted = true;
    if (this.form4.invalid) {
      return;
    }
    let _reqbody = {
      quoteno: this.quoteno,
      typecd: this.form4.value.typecd,
      region: this.form4.value.region,
      country: this.form4.value.country,
      city: this.form4.value.city,
      district: this.form4.value.district,
      land_size: this.form4.value.land_size,
      building_size: this.form4.value.building_size,
      isrestricted: this.form4.value.isrestricted,
      purposeid: this.form4.value.purposeid,
      totalprop: this.form4.value.totalprop,
      totalevalutor: this.form4.value.totaleveneed,
    };
    this.custservice.savePropertyInfoData(_reqbody).subscribe((data: any) => {
      if (data && data.success) {
        this.toastr.success('saved successfully');
        this.propertyList.push({
          typecd: this.form4.value.typecd,
          region: this.form4.value.region,
          country: this.form4.value.country,
          city: this.form4.value.city,
          district: this.form4.value.district,
          land_size: this.form4.value.land_size,
          building_size: this.form4.value.building_size,
        });
        this.setForm4();
        this.submitted = false;
      } else {
        this.toastr.error('something went wrong');
      }
    });
  }
  getRegionByCountry() {
    this.regionList = this.regionTempList.filter(
      (f: any) => f.fk_country_id == this.form4.value.country
    );
  }
  getCityByRegion() {
    this.cityList = this.cityTempList.filter(
      (f: any) => f.fk_region_id == this.form4.value.region
    );
  }
  getDistrictByCity() {
    let _currentCity = this.cityTempList.find(
      (f: any) => f.id == this.form4.value.city
    );
    if (_currentCity && _currentCity['isrestricted'] == 1) {
      this.iscityrestricted = true;
    } else {
      this.iscityrestricted = false;
    }
    this.districtList = this.districtTempList.filter(
      (f: any) => f.fk_city_id == this.form4.value.city
    );
  }

  getDistrictRestriction() {
    let _district = this.districtTempList.find(
      (f: any) => f.id == this.form4.value.district
    );
    if (_district && _district['isrestricted'] == 1) {
      this.isdistrictrestricted = true;
    } else {
      this.isdistrictrestricted = false;
    }
  }
  setOrderAndGetQuote() {
    this.custservice.getQuotationPrice(this.quoteno).subscribe((data: any) => {
      debugger
      if (data && data.success) {
        this.currentstep = 'STEP6';
        this.payAmount = data['data'];
        let _url = encodeURI(this.baseUrl + '/pay-status/');
        sessionStorage.setItem(
          'moysaramount',
          (this.payAmount * 100).toString()
        );
        sessionStorage.setItem('moysarcallback', _url);
        sessionStorage.setItem('moysardesc', this.quoteno);
        localStorage.setItem('tempid', this.quoteno);
        this.loadMoysarJs();
      }
    });
  }
  loadMoysarJs() {
    let _version = this.getRndInteger(100, 9999);
    let node3 = document.createElement('script');
    node3.id = 'cutmoysar';
    node3.src = '../../../../assets/js/moysar-api-auth.js?v=' + _version;
    node3.type = 'text/javascript';
    node3.async = true;
    document.getElementsByTagName('head')[0].appendChild(node3);
  }
  removeMoysarJs() {
    var linkNode = document.getElementById('cutmoysar');
    if (linkNode) {
      document.getElementsByTagName('head')[0].removeChild(linkNode);
    }
  }
  //#region ALL GET METHODS
  getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  getPurpose() {
    this.custservice.getPurposeList().subscribe((data: any) => {
      if (data && data.success) {
        this.purposeList = data['items'];
      }
    });
  }
  getCountry() {
    this.custservice.getCountryList().subscribe((data: any) => {
      if (data && data.success) {
        this.countryList = data['items'];
      }
    });
  }
  getRegion() {
    this.custservice.getRegionList().subscribe((data: any) => {
      if (data && data.success) {
        this.regionTempList = data['items'];
      }
    });
  }
  getCity() {
    this.custservice.getCityList().subscribe((data: any) => {
      if (data && data.success) {
        this.cityTempList = data['items'];
      }
    });
  }
  getDistrict() {
    this.custservice.getDistrictList().subscribe((data: any) => {
      if (data && data.success) {
        this.districtTempList = data['items'];
      }
    });
  }
  //#endregion
}
