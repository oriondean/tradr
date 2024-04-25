import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TradeHistoryModel } from '../../components/trade-history/trade-history.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradesService {
  private ApiUrl = 'http://localhost:8080/trade/';

  constructor(private http: HttpClient) {}

  getTrades(): Observable<TradeHistoryModel[]> {
    return this.http.get<TradeHistoryModel[]>(`${this.ApiUrl}\allTrades`);
  }
}
