import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TradeHistoryModel } from '../trade-history/trade-history.model';


@Component({
  selector: 'app-private-order-book',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './private-order-book.component.html',
  styleUrl: './private-order-book.component.css',
})
export class PrivateOrderBookComponent {
  openOrders: Map<number, number> = new Map<number, number>();
  tradeHistory: TradeHistoryModel[] = [];
  displayedColumnsFilled: string[] = ['quantity', 'price', 'time'];
  displayedColumnsOpen = ['price', 'quantity'];
  openDataSource = Object.entries(this.openOrders); 
  lastUpdated?: Date;
  constructor() {}

  //ToDo: add datasources from server
}
