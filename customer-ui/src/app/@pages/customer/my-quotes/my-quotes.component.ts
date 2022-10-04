import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.css'],
})
export class MyQuotesComponent implements OnInit {
  quoteList: any = [];
  isloading: boolean = false;
  currentQuote: string = '';
  allquotesDocList: any = [];
  currentQuoteDocList: any = [];
  constructor(
    private custservice: CustomerService,
    private router: Router,
    private modalService: NgbModal,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('App/auth') &&
      localStorage.getItem('App/auth') != null &&
      localStorage.getItem('App/auth') != undefined
    ) {
      this.getMyQuoteHistory();
      this.getMyQuoteDoc();
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  getMyQuoteHistory() {
    this.isloading = true;
    this.custservice.getMyQuotes().subscribe((data: any) => {
      this.isloading = false;
      if (data && data.success) {
        this.quoteList = data['items'];
      }
    });
  }
  getMyQuoteDoc() {
    this.isloading = true;
    this.custservice.getMyQuoteDocs().subscribe((data: any) => {
      this.isloading = false;
      if (data && data.success) {
        this.allquotesDocList = data['items'];
      }
    });
  }
  openFile(data: any, qNo: string) {
    this.currentQuote = qNo;
    this.modalService.open(data, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    this.currentQuoteDocList = this.allquotesDocList.filter(
      (f: any) => f.quote_number == qNo
    );
  }
  viewPDF(_pdfurl: string) {
    this.isloading = true;
    this.httpClient
      .get(_pdfurl, { responseType: 'arraybuffer' })
      .subscribe((data: BlobPart) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        this.isloading = false;
      });
  }
}
