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
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-building-pricing',
  templateUrl: './building-pricing.component.html',
  styleUrls: ['./building-pricing.component.css'],
})
export class BuildingPricingComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    titlear: new FormControl(''),
    area: new FormControl('0'),
    price: new FormControl('0'),
  });
  submitted = false;
  isloading: boolean = false;
  currentId: number = 0;
  buildingList: any = [];
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getBuildingPricingList();
  }
  setForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      titlear: ['', Validators.required],
      area: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getBuildingPricingList() {
    this.adminService.getBuildingPricing().subscribe((data: any) => {
      if (data && data.success) {
        this.buildingList = data['items'];
      }
    });
  }
  openModel(data: any, id: number) {
    this.setForm();
    this.currentId = id;
    if (id > 0) {
      let _existingData = this.buildingList.find((f: any) => f.id === id);
      this.form.patchValue({
        title: _existingData['title'],
        titlear: _existingData['title_ar'],
        area: _existingData['area'],
        price: _existingData['price'],
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
      area: this.form.value.area,
      price: this.form.value.price,
      id: this.currentId,
    };
    if (this.currentId > 0) {
      this.adminService.updateBuildingPricing(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getBuildingPricingList();
          this.currentId = 0;
        } else {
          this.toastr.error(data.message);
        }
      });
    } else {
      this.adminService.saveBuildingPricing(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getBuildingPricingList();
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
        this.adminService.deleteBuildingPricing(_reqbody).subscribe((data: any) => {
          if (data && data.success) {
            this.toastr.success(data.message);
            this.getBuildingPricingList();
          } else {
            this.toastr.error(data.message);
          }
        });
      } else {
      }
    });
  }
}
