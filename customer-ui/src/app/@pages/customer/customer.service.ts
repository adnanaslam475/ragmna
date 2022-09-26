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

  getCountryList() {
    return this.http
      .get(environment.apiUrl + 'admin/country/list', this.httpOptions)
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
