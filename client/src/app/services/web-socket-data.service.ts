import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StompService } from './api/Stomp.service';
import { TradeHistoryModel } from '../components/trade-history/trade-history.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketDataService {
  private bidOrdersSubject = new BehaviorSubject<Map< number, number>>(new Map<number, number>());
  bidOrders$ = this.bidOrdersSubject.asObservable();

  private askOrdersSubject = new BehaviorSubject<Map< number, number>>(new Map<number, number>());
  askOrders$ = this.askOrdersSubject.asObservable();

  private tradeHistorySubject = new BehaviorSubject<TradeHistoryModel[]>([]);
  tradeHistory$ = this.tradeHistorySubject.asObservable();
  
  constructor(private stompService: StompService) {
    this.stompService.subscribe('/topic/public/bids', (bids) => {
      this.bidOrdersSubject.next(JSON.parse(bids.body));
    });

    this.stompService.subscribe('/topic/public/asks', (asks) => {
      this.askOrdersSubject.next(JSON.parse(asks.body));
    });

    this.stompService.subscribe('/topic/trades', (tradeUpdate) => {
      const trade = JSON.parse(tradeUpdate.body);
      this.tradeHistorySubject.next([...trade, ...this.tradeHistorySubject.value]);
    });
   }
}
