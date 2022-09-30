import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css'],
})
export class QuoteListComponent implements OnInit {
  quoteList: any = [];
  base64Output = '';
  fileName = '';
  fileext: string = '';
  blobURL: string = '';
  isloading:boolean = false;
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getquoteList();
  }
  getquoteList() {
    this.adminService.getAllQuotes().subscribe((data: any) => {
      if (data && data.success) {
        this.quoteList = data['items'];
      }
    });
  }
  onFileSelection(event: any, quoteid: string) {
    debugger
    this.base64Output = '';
    this.fileName = '';
    this.fileName = event.target.files[0].name;
    this.fileext = this.fileName.slice(
      ((this.fileName.lastIndexOf('.') - 1) >>> 0) + 2
    );
    this.handleUpload(event, quoteid);
  }

  handleUpload(event: any, quoteid: string) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.isloading= true;
      this.base64Output = reader.result!.toString();
      if (this.base64Output != '') {
        let _req = {
          data: this.base64Output.split(",")[1],
          filename: this.adminService.getName() + '.' + this.fileext,
        };
        this.adminService.uploadFile(_req).subscribe((data: any) => {
          this.blobURL = data['data'];
          let _reqFile = {
            quoteno: quoteid,
            url: this.blobURL,
          };
          this.adminService
            .updateFileAgainstQuote(_reqFile)
            .subscribe((data: any) => {
              this.isloading= false;
              if (data && data.success) {
                this.toastr.success('file upload successfully');
                this.getquoteList();
              } else {
                this.toastr.error('Something went wrong uploading');
              }
            });
        });
      }else{
        this.isloading= false;
      }
    };
    if (file.size / 1024 / 1024 > 5) {
      this.toastr.error('file is bigger than 1MB, please upload a new file');
      this.base64Output = '';
      this.fileName = '';
    }
  }
}
