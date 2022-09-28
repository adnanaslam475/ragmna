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

@Component({
  selector: 'app-msgonscreen',
  templateUrl: './msgonscreen.component.html',
  styleUrls: ['./msgonscreen.component.css'],
})
export class MsgonscreenComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    msg: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  currentcode: string = '';
  templateList: any = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getEmailTemplate();
  }
  setForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      msg: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  openModel(data: any, code: string) {
    this.setForm();
    this.currentcode = code;

    let _existingData = this.templateList.find((f: any) => f.code === code);

    this.form.patchValue({
      title: _existingData['title'],
      msg: _existingData['msg'],
    });

    this.modalService.open(data, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  getEmailTemplate() {
    this.adminService.getMsgOnScreen().subscribe((data: any) => {
      if (data && data.success) {
        this.templateList = data['items'];
      }
    });
  }
  updateNotification() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let _reqbody = {
      title: this.form.value.title,
      msg: this.form.value.msg,
      code: this.currentcode,
    };

    this.adminService.updateMsgOnScreen(_reqbody).subscribe((data: any) => {
      if (data && data.success) {
        this.getEmailTemplate();
        this.modalService.dismissAll();
        this.toastr.success('template updated successfully');
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
