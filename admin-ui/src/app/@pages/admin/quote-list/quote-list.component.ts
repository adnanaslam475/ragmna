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
  isloading: boolean = false;
  unDetailsList: any = [];
  activePage: number = 1;
  itemPerPage: number = 10;
  totalRecords: number = 0;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getquoteList(1);
  }
  getquoteList(currentPage: number) {
    this.adminService.getAllQuotes().subscribe((data: any) => {
      if (data && data.success) {
        let oldArray = data['items'];
        this.quoteList = oldArray.map(function (item: any, rank: number) {
          rank = rank + 1;
          return { rank, ...item };
        });
        let perPage = this.itemPerPage * (currentPage - 1);
        this.totalRecords =
          data['items'] != null && data['items'] != undefined
            ? data['items'].length
            : 0;
        this.unDetailsList = this.quoteList;
        this.unDetailsList = this.unDetailsList.filter(
          (x: { rank: number }) =>
            x.rank >= perPage + 1 && x.rank <= perPage + this.itemPerPage
        );
      }
    });
  }
  onFileSelection(event: any, quoteid: string) {
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
      this.isloading = true;
      this.base64Output = reader.result!.toString();
      if (this.base64Output != '') {
        let _req = {
          data: this.base64Output.split(',')[1],
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
              this.isloading = false;
              if (data && data.success) {
                this.toastr.success('file upload successfully');
                this.getquoteList(1);
              } else {
                this.toastr.error('Something went wrong uploading');
              }
            });
        });
      } else {
        this.isloading = false;
      }
    };
    if (file.size / 1024 / 1024 > 5) {
      this.toastr.error('file is bigger than 1MB, please upload a new file');
      this.base64Output = '';
      this.fileName = '';
    }
  }
  getConfigList(currentPage: number) {
    let perPage = this.itemPerPage * (currentPage - 1);
    this.unDetailsList = this.quoteList.filter(
      (x: { rank: number }) =>
        x.rank >= perPage + 1 && x.rank <= perPage + this.itemPerPage
    );
  }
  DisplayActivePage(activePageNumber: number): void {
    this.activePage = activePageNumber;
    this.getConfigList(this.activePage);
  }
  searchData(keyword: string): void {
    let perPage = this.itemPerPage * (this.activePage - 1);
    if (keyword.length > 2) {
      debugger;
      let searchkeyword = keyword.toLocaleLowerCase();
      let filterList = this.quoteList.filter(
        (f: any) =>
          (f['quote_number'] != null &&
            f['quote_number'] != '' &&
            f['quote_number'] != undefined &&
            f['quote_number'].toLowerCase().indexOf(searchkeyword) >= 0) ||
          (f['fname'] != null &&
            f['fname'] != '' &&
            f['fname'] != undefined &&
            f['fname'].toLowerCase().indexOf(searchkeyword) >= 0) ||
          (f['lname'] != null &&
            f['lname'] != '' &&
            f['lname'] != undefined &&
            f['lname'].toLowerCase().indexOf(searchkeyword) >= 0) ||
          (f['email'] != null &&
            f['email'] != '' &&
            f['email'] != undefined &&
            f['email'].toLowerCase().indexOf(searchkeyword) >= 0) ||
          (f['service_type'] != null &&
            f['service_type'] != '' &&
            f['service_type'] != undefined &&
            f['service_type'].toLowerCase().indexOf(searchkeyword) >= 0) ||
          (f['categorycode'] != null &&
            f['categorycode'] != '' &&
            f['categorycode'] != undefined &&
            f['categorycode'].toLowerCase().indexOf(searchkeyword) >= 0)
      );

      if (
        filterList &&
        filterList != null &&
        filterList != undefined &&
        filterList.length > 0
      ) {
        filterList.map(function (item: any) {
          delete item.rank;
          return item;
        });
        console.log(filterList);
        let oldArray = filterList;
        this.totalRecords = filterList.length;
        filterList = oldArray.map(function (item: any, rank: number) {
          rank = rank + 1;
          return { rank, ...item };
        });
        this.unDetailsList = filterList.filter(
          (x: { rank: number }) =>
            x.rank >= perPage + 1 && x.rank <= perPage + this.itemPerPage
        );
      } else {
        this.unDetailsList = [];
      }
    } else {
      this.unDetailsList = this.quoteList;
      this.totalRecords = this.quoteList.length;
      this.unDetailsList = this.unDetailsList.filter(
        (x: { rank: number }) =>
          x.rank >= perPage + 1 && x.rank <= perPage + this.itemPerPage
      );
    }
  }
}
