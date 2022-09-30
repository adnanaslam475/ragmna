import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.css'],
})
export class MyQuotesComponent implements OnInit {
  quoteList: any = [];
  isloading: boolean = false;
  constructor(private custservice: CustomerService, private router: Router,) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('App/auth') &&
      localStorage.getItem('App/auth') != null &&
      localStorage.getItem('App/auth') != undefined
    ) {
      this.getMyQuoteHistory();
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
}
