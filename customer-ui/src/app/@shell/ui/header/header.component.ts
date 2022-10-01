import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from 'src/app/@pages/customer/customer.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  lang: string = 'ar';
  constructor(
    public translate: TranslateService,
    private router: Router,
    public appservice: AppService
  ) {}
  ngOnInit(): void {}
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('clang', lang);
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.appservice.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
