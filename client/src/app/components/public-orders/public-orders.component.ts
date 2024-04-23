import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PublicOrdersService } from '../../services/public-orders/public-orders.service';
import { Client } from '@stomp/stompjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { StompService } from '../../services/api/Stomp.service';

@Component({
  selector: 'app-public-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './public-orders.component.html',
  styleUrl: './public-orders.component.css',
})
export class PublicOrdersComponent {
  askOrders: Map<number, number> = new Map<number, number>();
  bidOrders: Map<number, number> = new Map<number, number>();
  displayedColumns = ['price', 'quantity'];
  bidDataSource = Object.entries(this.bidOrders);
  askDataSource = Object.entries(this.askOrders);

  constructor(
    private orderService: PublicOrdersService,
    private stompService: StompService
  ) {
    this.orderService.getAsks().subscribe((asks) => {
      this.askOrders = asks;
      this.askDataSource = Object.entries(this.askOrders);
    });
    this.orderService.getBids().subscribe((bids) => {
      this.bidOrders = bids;
      this.bidDataSource = Object.entries(this.bidOrders);
    });

    stompService.subscribe('/topic/public/bids', (bids) => {
      this.bidOrders = JSON.parse(bids.body);
      this.bidDataSource = Object.entries(this.bidOrders);
    });

    stompService.subscribe('/topic/public/asks', (asks) => {
      this.askOrders = JSON.parse(asks.body);
      this.askDataSource = Object.entries(this.askOrders);
    });
  }
}
