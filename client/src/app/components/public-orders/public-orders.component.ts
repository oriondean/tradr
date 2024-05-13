import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TimeagoModule } from 'ngx-timeago';
import { WebSocketDataService } from '../../services/web-socket-data.service';

@Component({
  selector: 'app-public-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, TimeagoModule],
  templateUrl: './public-orders.component.html',
  styleUrl: './public-orders.component.css',
})
export class PublicOrdersComponent implements OnInit {
  askOrders: Map<number, number> = new Map<number, number>();
  bidOrders: Map<number, number> = new Map<number, number>();
  displayedColumns = ['price', 'quantity'];
  bidDataSource = Object.entries(this.bidOrders);
  askDataSource = Object.entries(this.askOrders);
  lastUpdated?: Date;

  constructor(private webSocketDataService: WebSocketDataService) {}

  ngOnInit(): void {
    this.webSocketDataService.bidOrders$.subscribe((bidOrders) => {
      this.bidOrders = this.bidOrders;
    });

    this.webSocketDataService.askOrders$.subscribe((askOrders) => {
      this.askOrders = this.askOrders;
    });
  }
}
