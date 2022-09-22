import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css'],
})
export class ConditionComponent implements OnInit {
  form: FormGroup = new FormGroup({
    maxbuilding: new FormControl(''),
    maxlanding: new FormControl(''),
    maxproperty: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getPropertyConditions();
  }
  setForm() {
    this.form = this.formBuilder.group({
      maxbuilding: ['', Validators.required],
      maxlanding: ['', Validators.required],
      maxproperty: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getPropertyConditions() {
    this.adminService.getConditionList().subscribe((data: any) => {
      if (data && data.success) {
        let _dataList = data['items'];
        this.form.patchValue({
          maxbuilding: _dataList.find((f: any) => f.code == 'MAXBUILDINGAREA')[
            'val'
          ],
          maxlanding: _dataList.find((f: any) => f.code == 'MAXLANDAREA')[
            'val'
          ],
          maxproperty: _dataList.find((f: any) => f.code == 'MAXPROPERTY')[
            'val'
          ],
        });
      } else {
        this.toastr.error(data.message);
      }
    });
  }
  submitData() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.isloading = true;
    let _reqbody = [
      {
        code: 'MAXBUILDINGAREA',
        val: this.form.value.maxbuilding,
      },
      {
        code: 'MAXLANDAREA',
        val: this.form.value.maxlanding,
      },
      {
        code: 'MAXPROPERTY',
        val: this.form.value.maxproperty,
      },
    ];
    this.adminService.saveCondition(_reqbody).subscribe((data: any) => {
      this.isloading = false;
      if (data && data.success) {
        this.toastr.success(data.message);
        this.getPropertyConditions();
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
