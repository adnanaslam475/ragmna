import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ROUTER_UTILS } from '../utils/router.utils';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,private toastr: ToastrService,) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
       
        if ([401, 403].includes(error.status)) {
          this.router.navigateByUrl("auth/"+ROUTER_UTILS.config.auth.signIn);
          return throwError(error);
        } else if (error.status === 500) {
          
          if (error.error && error.error.includes("TokenExpiredError")) {
            this.toastr.error("Your session has been expired, please login again");
          

            setTimeout(() => {
              localStorage.clear();
              sessionStorage.clear();
              this.router.navigate(["auth/sign-in"]);
              location.href="/auth/sign-in"
            }, 3000);
          }else{
            this.toastr.error("Internal server error")
          }
          return throwError(error);
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
