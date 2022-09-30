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
   
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('clang', lang);
  }
}
