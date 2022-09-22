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
  selector: 'app-area-region',
  templateUrl: './area-region.component.html',
  styleUrls: ['./area-region.component.css'],
})
export class AreaRegionComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    titlear: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  currentId: number = 0;
  regionList: any = [];
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getRegionList();
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
  getRegionList() {
    this.adminService.getregionList().subscribe((data: any) => {
      if (data && data.success) {
        this.regionList = data['items'];
      }
    });
  }
  openModel(data: any, id: number) {
    this.setForm();
    this.currentId = id;
    if (id > 0) {
      let _existingData = this.regionList.find((f: any) => f.id === id);
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
      this.adminService.updateRegion(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getRegionList();
          this.currentId = 0;
        } else {
          this.toastr.error(data.message);
        }
      });
    } else {
      this.adminService.saveRegion(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.modalService.dismissAll();
          this.getRegionList();
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
        this.adminService.deleteRegion(_reqbody).subscribe((data: any) => {
          if (data && data.success) {
            this.toastr.success(data.message);
            this.getRegionList();
          } else {
            this.toastr.error(data.message);
          }
        });
      } else {
      }
    });
  }
}
