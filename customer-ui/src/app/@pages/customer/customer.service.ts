import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
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
