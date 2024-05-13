import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TradeHistoryModel } from './trade-history.model';
import { MatCardModule } from '@angular/material/card';
import {  MatTableModule } from '@angular/material/table';
import { TimeagoModule } from 'ngx-timeago';
import { WebSocketDataService } from '../../services/web-socket-data.service';

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

  constructor(private webSocketDataService: WebSocketDataService) {}

    ngOnInit(): void {
      this.webSocketDataService.tradeHistory$.subscribe((tradeHistory) => { 
        this.tradeHistory = this.tradeHistory;
      })
    }
  }
