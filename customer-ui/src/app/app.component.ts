import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CustomerService } from './@pages/customer/customer.service';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'customer-ui';
  constructor(
    public translate: TranslateService,
    public custService: CustomerService,
    private appservice: AppService
  ) {
    if (
      localStorage.getItem('clang') != null &&
      localStorage.getItem('clang') != undefined &&
      localStorage.getItem('clang') != ''
    ) {
      translate.setDefaultLang(localStorage.getItem('clang')!);

      if (localStorage.getItem('clang') == 'ar') {
        translate.addLangs([localStorage.getItem('clang')!, 'en']);
      } else if (localStorage.getItem('clang') == 'en') {
        translate.addLangs([localStorage.getItem('clang')!, 'ar']);
      }
    } else {
      translate.addLangs(['ar', 'en']);
      translate.setDefaultLang('ar');
    }
  }
  ngOnInit(): void {
    if (
      localStorage.getItem('App/auth') &&
      localStorage.getItem('App/auth') != null &&
      localStorage.getItem('App/auth') != undefined &&
      localStorage.getItem('App/auth') != ''
    ) {
      this.appservice.isLoggedIn = true;
    }
  }
}
