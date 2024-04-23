import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PublicOrdersService } from '../../services/public-orders/public-orders.service';
import { Client } from '@stomp/stompjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';


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
  displayedColumns = ['quantity', 'price'];

  constructor(private orderService: PublicOrdersService) {
    this.orderService.getAsks().subscribe((asks) => (this.askOrders = asks));
    this.orderService.getBids().subscribe((bids) => (this.bidOrders = bids));
  }
}
