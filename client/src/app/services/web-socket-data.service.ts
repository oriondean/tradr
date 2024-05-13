import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StompService } from './api/Stomp.service';
import { TradeHistoryModel } from '../components/trade-history/trade-history.model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketDataService {
  private bidOrdersSubject = new BehaviorSubject<[number, number][]>([]);
  bidOrders$ = this.bidOrdersSubject.asObservable();

  private askOrdersSubject = new BehaviorSubject<[number, number][]>([]);
  askOrders$ = this.askOrdersSubject.asObservable();

  private tradeHistorySubject = new BehaviorSubject<TradeHistoryModel[]>([]);
  tradeHistory$ = this.tradeHistorySubject.asObservable();

  constructor(private stompService: StompService) {
    this.stompService.subscribe('/topic/public/bids', (bids) => {
      const bidOrders = this.convertMapToArray(JSON.parse(bids.body));
      this.bidOrdersSubject.next(bidOrders);
    });

    this.stompService.subscribe('/topic/public/asks', (asks) => {
      const askOrders = this.convertMapToArray(JSON.parse(asks.body));
      this.askOrdersSubject.next(askOrders);
    });

    this.stompService.subscribe('/topic/trades', (tradeUpdate) => {
      const trade = JSON.parse(tradeUpdate.body);

      const existingTrade = this.tradeHistorySubject.value.find(
        (t) => t.id === trade.id
      );

      if (!existingTrade) {
        this.tradeHistorySubject.next([
          ...trade,
          ...this.tradeHistorySubject.value,
        ]);
      }
    });
  }

  private convertMapToArray(mapData: {
    [key: number]: number;
  }): [number, number][] {
    return Object.entries(mapData).map(([key, value]) => [+key, value]);
  }
}
