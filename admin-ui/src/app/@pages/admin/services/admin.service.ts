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
}
