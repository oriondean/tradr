import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})

export class OrderFormComponent {
  constructor(private http: HttpClient) {}
  quantity = 0;
  price = 0;
  action = "BID";
  buy = true;

  sendData(data: any) {
    const url = 'http://localhost:8080/order/';
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.post(url, data, { headers });
  }

  operation(buy: boolean) {
    this.buy = buy;
  }

  postData() {
    let action = "BID"
    if (!this.buy){
      action = "ASK"
    }
    console.log('Input value: ', this.quantity)
    const data: any = {
      quantity: this.quantity,
      price: this.price,
      action,
      account: 'dkerr',
      initialQuantity: 30,
    };
    this.sendData(data).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
