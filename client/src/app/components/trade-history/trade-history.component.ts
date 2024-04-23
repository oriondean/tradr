import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { TradeHistoryModel } from './trade-history.model';

import { TradesService } from '../../services/trades/trades.service';

@Component({
  selector: 'app-trade-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trade-history.component.html',
  styleUrl: './trade-history.component.css',
})
export class TradeHistoryComponent {
  tradeHistory: TradeHistoryModel[] = [];

  ngOnInit(): void {}

  constructor(tradeService: TradesService) {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/',
      onConnect: (frame) => {
        console.log('connected', frame);

        client.subscribe('/topic/trades', (tradeUpdate) => {
          const trade = JSON.parse(tradeUpdate.body);
          // this.tradeHistory.unshift(trade);
          this.tradeHistory = [...trade, this.tradeHistory];
          console.log('trade inbound', JSON.parse(tradeUpdate.body));
          console.log('trade history', this.tradeHistory);
        }, {username: "test"});
      },
      onStompError: (e) => console.log('onStompError', e),
      onWebSocketError: (e) => console.log('onWebsocketError', e.message),
    });

    client.activate();
    
  }
  
}
