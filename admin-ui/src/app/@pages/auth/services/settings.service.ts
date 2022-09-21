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
import { ISMTPCofig } from 'src/app/@core/shared/IUserSettings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));

  // get isLoggedIn(): boolean {
  //   return this.isLoggedIn$.getValue();
  // }
  // constructor(private http: HttpClient) {}
  // _token: string = getItem(StorageItem.Auth).toString();
  // // Http Options
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     token: this._token,
  //   }),
  // };

  // //#region SMTP Settings Details

  // getSMTPSettings() {
  //   return this.http
  //     .get(
  //       environment.apisecureUrl + 'user/get-smtp-settings',
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // addSMTPSettings(smtpSettings: ISMTPCofig): Observable<ISMTPCofig> {
  //   return this.http
  //     .post<ISMTPCofig>(
  //       environment.apisecureUrl + 'user/add-smtp-settings',
  //       JSON.stringify(smtpSettings),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // updateSMTPSettings(postData: any) {
  //   return this.http
  //     .post(
  //       environment.apiUrl + 'update-profile-data',
  //       postData,
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // //#endregion

  // //#region Admin PG Config Settings

  // getAdminPGDetails() {
  //   return this.http
  //     .get(environment.apisecureUrl + 'admin/get-pg-settings', this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // addAdminPGDetails(postData: any) {
  //   return this.http
  //     .post(
  //       environment.apisecureUrl + 'user/add-admin-pg-settings ',
  //       postData,
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // updateAdminPGDetails(postData: any) {
  //   return this.http
  //     .post(
  //       environment.apisecureUrl + 'user/update-admin-pg-settings',
  //       postData,
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // updatePGDetails(postData: any) {
  //   return this.http
  //     .post(
  //       environment.apisecureUrl + 'admin/update-pg-settings',
  //       postData,
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // //#endregion

  // //#region Admin Config Templates

  // getAdminConfigTemplate() {
  //   return this.http
  //     .get(
  //       environment.apisecureUrl + 'admin/get-adming-config-temp-list',
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // getAdminConfigTemplateById(code: any) {
  //   return this.http
  //     .get(
  //       environment.apisecureUrl + 'admin/get-adming-config-temp/' + code,
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // updateAdminConfigTemplate(postData: any) {
  //   return this.http
  //     .post(
  //       environment.apisecureUrl + 'admin/update-admin-config-template',
  //       postData,
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // //#endregion

  // //#region Payment Logs Report

  // getPaymentLogs() {
  //   return this.http
  //     .get(
  //       environment.apisecureUrl + 'admin/get-payment-logs-report',
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // getCustomerReportPackages() {
  //   return this.http
  //     .get(
  //       environment.apisecureUrl + 'admin/get-cust-package-report',
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  //#endregion

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
