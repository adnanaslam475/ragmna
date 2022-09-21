import { Injectable } from '@angular/core';
import {
  getItem,
  removeItem,
  setItem,
  StorageItem,
} from '../../../@core/utils';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IForgotPwd, Isignin, Isignup } from 'src/app/@core/shared/Isignup';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  signIn(signin: any): Observable<Isignin> {
    // const token = Array(4)
    //   .fill(0)
    //   .map(() => Math.random() * 99)
    //   .join('-');

    // setItem(StorageItem.Auth, token);
    // this.isLoggedIn$.next(true);

    return this.http
      .post<Isignin>(
        environment.apiUrl + 'login',
        JSON.stringify(signin),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  signOut(): void {
    removeItem(StorageItem.Auth);
    this.isLoggedIn$.next(false);
  }

  signUpCreate(signup: any): Observable<Isignup> {
    return this.http
      .post<Isignup>(
        environment.apiUrl + 'signup',
        JSON.stringify(signup),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  emailOTPSend(forgotpwd: any): Observable<IForgotPwd> {
    console.log(environment.apiUrl + 'fp/email-send-otp');
    return this.http
      .post<IForgotPwd>(
        environment.apiUrl + 'fp/email-send-otp',
        JSON.stringify(forgotpwd),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  VerifyOTP(forgotpwd: any): Observable<IForgotPwd> {
    return this.http
      .post<IForgotPwd>(
        environment.apiUrl + 'fp/email-verify-otp',
        JSON.stringify(forgotpwd),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateUserPassword(forgotpwd: any): Observable<IForgotPwd> {
    return this.http
      .post<IForgotPwd>(
        environment.apiUrl + 'fp/update-user-pwd',
        JSON.stringify(forgotpwd),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  getauthSubscriptionPlan() {
    return this.http
      .get(environment.apiUrl + 'common/subscription-plan', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getPackageMenuListByAdmin() {
    return this.http
      .get(
        environment.apiUrl + 'signin/get-package-menu-list',
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getUserProfileById(id: number) {
    return this.http
      .get(environment.apiUrl + 'get-profile-data/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  paymentUpdateByUserId(postData: any,id:number) {
    return this.http
      .post(
        environment.apiUrl + 'pay/process-update-payment/'+ id,
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
