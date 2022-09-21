import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { removeItem, StorageItem } from 'src/app/@core/utils';
import { AuthService } from 'src/app/@pages/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
 
  lang: string = 'ar';
  constructor(
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    // if (localStorage.getItem('fullname')) {
    //   this.fullname = localStorage.getItem('fullname')!.toString();
    // }
    // if (
    //   localStorage.getItem('profileurl') &&
    //   localStorage.getItem('profileurl') != null &&
    //   localStorage.getItem('profileurl') != undefined &&
    //   localStorage.getItem('profileurl') != '' &&
    //   localStorage.getItem('profileurl') != 'null' &&
    //   localStorage.getItem('profileurl') != 'undefined'
    // ) {
    //   this.profilepic = localStorage.getItem('profileurl')!.toString();
    // } else {
    //   this.profilepic = '../../../../assets/assets/img/user-avatar.jpg';
    // }
  }
  // getLogout() {
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   this.authService.signOut();

  //   this.router.navigate(['/auth/sign-in'], {
  //     clearHistory: true,
  //   } as NavigationExtras);
  //   location.reload();
  // }
  // getmyprofile() {
  //   this.router.navigate(['/cust/my-profile']);
  // }
  // switchLang(lang: string) {
  //   this.translate.use(lang);
  //   localStorage.setItem('clang', lang);
  // }
}
