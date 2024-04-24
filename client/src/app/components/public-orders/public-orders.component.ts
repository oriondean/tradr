import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { StompService } from '../../services/api/Stomp.service';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-public-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, TimeagoModule],
  templateUrl: './public-orders.component.html',
  styleUrl: './public-orders.component.css',
})
export class PublicOrdersComponent {
  askOrders: Map<number, number> = new Map<number, number>();
  bidOrders: Map<number, number> = new Map<number, number>();
  displayedColumns = ['price', 'quantity'];
  bidDataSource = Object.entries(this.bidOrders);
  askDataSource = Object.entries(this.askOrders);
  lastUpdated?: Date;

  constructor(
    private stompService: StompService
  ) {
    this.stompService.subscribe('/topic/public/bids', (bids) => {
      this.bidOrders = JSON.parse(bids.body);
      this.bidDataSource = Object.entries(this.bidOrders);
      this.lastUpdated = new Date();
    });

    this.stompService.subscribe('/topic/public/asks', (asks) => {
      this.askOrders = JSON.parse(asks.body);
      this.askDataSource = Object.entries(this.askOrders);
      this.lastUpdated = new Date();
    });
  }
}
