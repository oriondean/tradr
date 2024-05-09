import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TradeHistoryModel } from './trade-history.model';
import { MatCardModule } from '@angular/material/card';
import { StompService } from '../../services/api/Stomp.service';
import {  MatTableModule } from '@angular/material/table';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-trade-history',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, TimeagoModule],
  templateUrl: './trade-history.component.html',
  styleUrl: './trade-history.component.css',
})
export class TradeHistoryComponent {
  tradeHistory: TradeHistoryModel[] = [];
  displayedColumns: string[] = ['quantity', 'price', 'time'];
  lastUpdated?: Date;

  ngOnInit(): void {}

  constructor(private client: StompService) {
    client.subscribe('/topic/trades', (tradeUpdate) => {
      const trade = JSON.parse(tradeUpdate.body);
      this.tradeHistory = [...trade, ...this.tradeHistory];
      this.lastUpdated = new Date();
    });
  }
}
