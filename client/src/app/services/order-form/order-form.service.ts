import { Injectable } from '@angular/core';
import { API_ROOT } from '../../../constants';
import { Trade } from '../../../types';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderFormService {
  private url = `${API_ROOT}/order/`;

  constructor(private http: HttpClient) {}

  placeOrder(data: Trade) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.post(this.url, data, { headers })
    .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
