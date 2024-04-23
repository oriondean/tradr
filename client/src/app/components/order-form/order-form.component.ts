import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Action, Trade } from '../../../types';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent {
  quantity = new FormControl();
  price = new FormControl();
  formGroup = new FormGroup({
    quantity: this.quantity,
    price: this.price,
  });
  bidInitialValue = 'bid';

  constructor(private http: HttpClient) {}
  action: Action = Action.BID;
  buy = true;

  sendData(data: Trade) {
    const url = 'http://localhost:8080/order/';
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.post(url, data, { headers });
  }

  postData() {
    if (this.formGroup.value.quantity && this.formGroup.value.price) {
      const data: Trade = {
        quantity: this.formGroup.value.quantity,
        price: this.formGroup.value.price,
        action: this.action,
        account: 'dkerr',
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
  bidAskValue(event: MatButtonToggleChange) {
    if (event.value === 'bid') {
      this.action = Action.BID;
    } else {
      this.action = Action.ASK;
    }
  }
}
