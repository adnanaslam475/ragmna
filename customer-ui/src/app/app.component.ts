import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'customer-ui';
  constructor(public translate: TranslateService) {
    debugger
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
      translate.setDefaultLang('en');
    }
  }
  ngOnInit(): void {}
}
