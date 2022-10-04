import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { getItem, StorageItem } from 'src/app/@core/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      authorization: getItem(StorageItem.Auth).toString(),
    }),
  };
  //#region Purpose
  getPurposeList() {
    return this.http
      .get(environment.apiUrl + 'admin/purpose/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  savePurpose(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/purpose/save',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  updatePurpose(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/purpose/update',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deletePurpose(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/purpose/delete',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region Land Pricing
  getLandPricing() {
    return this.http
      .get(environment.apiUrl + 'admin/land-pricing/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  saveLandPricing(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/land-pricing/add',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  updateLandPricing(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/land-pricing/update',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteLandPricing(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/land-pricing/delete',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region Building Pricing
  getBuildingPricing() {
    return this.http
      .get(environment.apiUrl + 'admin/build-pricing/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  saveBuildingPricing(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/build-pricing/add',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  updateBuildingPricing(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/build-pricing/update',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteBuildingPricing(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/build-pricing/delete',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region COUNTRY MASTER
  getCountryList() {
    return this.http
      .get(environment.apiUrl + 'admin/country/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  saveCountry(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/country/add',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  updateCountry(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/country/update',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteCountry(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/country/delete',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region REGION MASTER
  getregionList() {
    return this.http
      .get(environment.apiUrl + 'admin/region/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  saveRegion(postData: any) {
    return this.http
      .post(environment.apiUrl + 'admin/region/add', postData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  updateRegion(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/region/update',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteRegion(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/region/delete',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region CITY MASTER
  getCityList() {
    return this.http
      .get(environment.apiUrl + 'admin/city/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  saveCity(postData: any) {
    return this.http
      .post(environment.apiUrl + 'admin/city/add', postData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  updateCity(postData: any) {
    return this.http
      .put(environment.apiUrl + 'admin/city/update', postData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteCity(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/city/delete',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region DISTRICT MASTER
  getDistrictList() {
    return this.http
      .get(environment.apiUrl + 'admin/district/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  saveDistrict(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/district/add',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  updateDistrict(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/district/update',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteDistrict(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/district/delete',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region CONDITIONS
  getConditionList() {
    return this.http
      .get(environment.apiUrl + 'admin/condition/list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  saveCondition(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/condition/update',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region Email Templates
  getTemplateList() {
    return this.http
      .get(environment.apiUrl + 'admin/email-template', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  updateTemplate(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/email-template',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region Message On Screen
  getMsgOnScreen() {
    return this.http
      .get(environment.apiUrl + 'admin/msg-on-screen', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  updateMsgOnScreen(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'admin/msg-on-screen',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region
  getAllQuotes() {
    return this.http
      .get(environment.apiUrl + 'admin/all-quotes', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getAllQuotesDoc() {
    return this.http
      .get(environment.apiUrl + 'admin/all-quotes-doc', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  uploadFile(fileData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/upload-file',
        fileData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  updateFileAgainstQuote(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'admin/update-valuation-url',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  getName() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  //#endregion

  //#region Configuration
  getPGConfig() {
    return this.http
      .get(environment.apiUrl + 'admin/pg-config', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  updatePGConfig(postData: any) {
    return this.http
      .put(environment.apiUrl + 'admin/pg-config', postData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getSMTPConfig() {
    return this.http
      .get(environment.apiUrl + 'admin/smtp-config', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  updateSMTPConfig(postData: any) {
    return this.http
      .put(environment.apiUrl + 'admin/smtp-config', postData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion

  //#region Dashboard Data
  getDashboardData() {
    return this.http
      .get(environment.apiUrl + 'admin/dashboard', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  //#endregion
  //#region COMMON METHODS
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(error["error"])

    // window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  //#endregion
}
