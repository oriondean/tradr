import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROOT } from '../../../constants';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicOrdersService {
  private url = `${API_ROOT}/order`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getBids(): Observable<Map<number, number>> {
    return this.http
      .get<Map<number, number>>(`${this.url}/bids`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAsks(): Observable<Map<number, number>> {
    return this.http
      .get<Map<number, number>>(`${this.url}/asks`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
