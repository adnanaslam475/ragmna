import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { getItem, StorageItem } from 'src/app/@core/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({}),
  };

  saveQuoteNumber(postData: any) {
    return this.http
      .post(environment.apiUrl + 'cust/new-quote', postData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  savePersonalInfo(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'cust/personal-info',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  saveCompanyInfo(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'cust/company-info',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  savePurposeInfo(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'cust/purpose-eve-info',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  savePropertyInfoData(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'cust/property-info',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  getQuotationPrice(quoteId: string) {
    return this.http
      .get(environment.apiUrl + 'cust/quote-price/' + quoteId, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getCountryList() {
    return this.http
      .get(environment.apiUrl + 'cust/country-list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getPurposeList() {
    return this.http
      .get(environment.apiUrl + 'cust/purpose-list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getRegionList() {
    return this.http
      .get(environment.apiUrl + 'cust/region-list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCityList() {
    return this.http
      .get(environment.apiUrl + 'cust/city-list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getDistrictList() {
    return this.http
      .get(environment.apiUrl + 'cust/district-list', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  savePayInit(postData: any) {
    return this.http
      .post(
        environment.apiUrl + 'cust/quote-payment',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  savePayStatus(postData: any) {
    return this.http
      .put(
        environment.apiUrl + 'cust/quote-payment-status',
        postData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  signIn(signin: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + 'users/login', signin, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  signUP(signup: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + 'users/signup', signup, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getMyQuotes() {
    const _authToken = localStorage.getItem('App/auth')?.toString();
    if (_authToken) {
      const httpOptions2 = {
        headers: new HttpHeaders({
          authorization: _authToken,
        }),
      };
      return this.http
        .get(environment.apiUrl + 'cust/quotes-by-user', httpOptions2)
        .pipe(retry(1), catchError(this.handleError));
    } else {
      return this.http
        .get(environment.apiUrl + 'cust/quotes-by-user')
        .pipe(retry(1), catchError(this.handleError));
    }
  }
  updateCustId(postData: any) {
    debugger;
    const _authToken = localStorage.getItem('App/auth')?.toString();
    if (_authToken) {
      const httpOptions2 = {
        headers: new HttpHeaders({
          authorization: _authToken,
        }),
      };
      return this.http
        .post(
          environment.apiUrl + 'cust/update-cust-id',
          postData,
          httpOptions2
        )
        .pipe(retry(1), catchError(this.handleError));
    } else {
      return this.http
        .post(environment.apiUrl + 'cust/update-cust-id', postData)
        .pipe(retry(1), catchError(this.handleError));
    }
  }

  getBuildingConditions(){
    return this.http
    .get(environment.apiUrl + 'cust/condition-list')
    .pipe(retry(1), catchError(this.handleError));
  }
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
