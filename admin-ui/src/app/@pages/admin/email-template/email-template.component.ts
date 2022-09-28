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
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css'],
})
export class EmailTemplateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    subjectline: new FormControl(''),
    body: new FormControl(''),
  });
  submitted = false;
  isloading: boolean = false;
  currentcode: string = '';
  templateList: any = [];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],

    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
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
      subjectline: ['', Validators.required],
      body: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  openModel(data: any, code: string) {
    this.setForm();
    this.currentcode = code;

    let _existingData = this.templateList.find((f: any) => f.code === code);
    let _emailbody = '';
    debugger;
    if (
      _existingData['email_body'] &&
      _existingData['email_body'].data &&
      _existingData['email_body'].data.length > 0
    ) {
      const encoder = new TextDecoder('utf-8');
      const bufferArray = new Uint8Array(_existingData['email_body'].data);
      _emailbody = encoder.decode(bufferArray);
    }
    this.form.patchValue({
      title: _existingData['title'],
      subjectline: _existingData['email_subject_line'],
      body: _emailbody,
    });

    this.modalService.open(data, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  getEmailTemplate() {
    this.adminService.getTemplateList().subscribe((data: any) => {
      if (data && data.success) {
        this.templateList = data['items'];
      }
    });
  }
  updateEmailTemplate() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let _reqbody = {
      title: this.form.value.title,
      emailbody: this.form.value.body,
      emailsubject: this.form.value.subjectline,
      code: this.currentcode,
    };

    this.adminService.updateTemplate(_reqbody).subscribe((data: any) => {
      if (data && data.success) {
        this.getEmailTemplate();
        this.modalService.dismissAll();
        this.toastr.success('email template updated successfully');
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
