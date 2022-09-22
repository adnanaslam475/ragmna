import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  lang: string = 'ar';
  constructor(public translate: TranslateService) {}
  ngOnInit(): void {
    // setTimeout(() => {
    //   let node3 = document.createElement('script');
    //   node3.src = './assets/js/app.js';
    //   node3.type = 'text/javascript';
    //   node3.async = true;
    //   node3.id = 'helperjs';
    //   document.getElementsByTagName('head')[0].appendChild(node3);
    // }, 3000);
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('clang', lang);
  }
}
