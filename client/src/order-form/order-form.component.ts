import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent {
  constructor(private http: HttpClient) {}
  inputValue: number = 0;

  sendData(data: any) {
    const url = 'http://localhost:8080/order/';
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.post(url, data, { headers });
  }

  operation() {
    
  }

  postData() {
    console.log('Input value: ', this.inputValue)
    const data: any = {
      quantity: 30,
      price: 35,
      action: 'ASK',
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
