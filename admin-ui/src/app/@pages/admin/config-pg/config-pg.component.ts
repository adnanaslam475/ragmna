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
  selector: 'app-config-pg',
  templateUrl: './config-pg.component.html',
  styleUrls: ['./config-pg.component.css'],
})
export class ConfigPgComponent implements OnInit {
  form: FormGroup = new FormGroup({
    publishkey: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  currentCd: string = '';
  pgList: any = [];
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getPGConfiguration();
  }
  setForm() {
    this.form = this.formBuilder.group({
      publishkey: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getPGConfiguration() {
    this.adminService.getPGConfig().subscribe((data: any) => {
   
      if (data && data.success) {
        this.pgList = data['items'];
        this.currentCd = this.pgList[0]['pg_code'];
        let _pk = this.pgList.find((f: any) => f['pg_code'] == this.currentCd);
        this.form.setValue({
          publishkey: _pk['publishkey'],
        });
      } else {
        this.toastr.error(data.message);
      }
    });
  }
  submitData() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.isloading = true;
      let _reqbody = {
        code: this.currentCd,
        publishkey: this.form.value.publishkey,
      };
      this.adminService.updatePGConfig(_reqbody).subscribe((data: any) => {
        this.isloading = false;
        if (data && data.success) {
          this.toastr.success(data.message);
          this.getPGConfiguration();
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
}
