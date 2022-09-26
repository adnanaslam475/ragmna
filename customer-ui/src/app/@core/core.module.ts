import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtInterceptor, ServerErrorInterceptor } from './interceptors';
import { SafePipe } from './pipes/safe.pipe';
import { CustomFilterPipe } from './pipes/custom-filter.pipe';
import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { ShortNumberPipe } from './pipes/number.pipe';

@NgModule({

  declarations: [SafePipe, CustomFilterPipe, ShortNumberPipe,SafeHtmlPipe],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  exports:[SafePipe,CustomFilterPipe,SafeHtmlPipe,ShortNumberPipe]
})
export class CoreModule {}
