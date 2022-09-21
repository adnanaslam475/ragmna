import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthGuard, NoAuthGuard } from '../@core/guards';
import { ROUTER_UTILS } from '../@core/utils/router.utils';
import { NotFoundModule } from '../@shell/ui/not-found/not-found.module';
import { FooterModule } from './ui/footer/footer.module';
import { HeaderModule } from './ui/header/header.module';
import { LayoutModule } from './ui/layout/layout.module';
import { NotFoundPage } from './ui/not-found/not-found.page';

const APP_ROUTES: Routes = [
  {
    path: ROUTER_UTILS.config.auth.root,
    loadChildren: async () =>
      (await import('../@pages/auth/auth.module')).AuthModule,
    canLoad: [NoAuthGuard],
  },
  // {
  //   path: ROUTER_UTILS.config.base.home,
  //   loadChildren: async () =>
  //     (await import('../@pages/customer/customer.module')).CustomerModule,
  //   canLoad: [AuthGuard],
  // },

  {
    path: '**',
    loadChildren: async () =>
      (await import('../@shell/ui/not-found/not-found.module')).NotFoundModule,
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES),
    FooterModule,
    HeaderModule,
    LayoutModule,
    NotFoundModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    RouterModule,
    FooterModule,
    HeaderModule,
    LayoutModule,
    NotFoundModule,
  ],
  // providers: [
  //   // Below line is optional as default LocationStrategy is PathLocationStrategy
  //   { provide: LocationStrategy, useClass: PathLocationStrategy },
  // ],
})
export class WebShellModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
