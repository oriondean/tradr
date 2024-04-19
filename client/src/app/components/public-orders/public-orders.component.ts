import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type PublicOrder = {
  quantity: number;
  price: number;
  orderType: 'BID' | 'ASK';
};

@Component({
  selector: 'app-public-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-orders.component.html',
  styleUrl: './public-orders.component.css',
})
export class PublicOrdersComponent {
  orders: PublicOrder[] = [
    { quantity: 35, price: 20, orderType: 'BID' },
    { quantity: 70, price: 60, orderType: 'BID' },
    { quantity: 5, price: 15, orderType: 'ASK' },
    { quantity: 10, price: 30, orderType: 'BID' },
    { quantity: 45, price: 25, orderType: 'ASK' },
  ];

  askOrders = this.orders.filter((order) => order.orderType == 'ASK');
  bidOrders = this.orders.filter((order) => order.orderType == 'BID');
}
