import { OrderFormService } from './../../services/order-form/order-form.service';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Action, Trade } from '../../../types';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user/user.service';
import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
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
  selectedUser: string = '';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private orderFormService: OrderFormService
  ) {
    console.log(this.userService.getUser());
  }

  action: Action = Action.BID;

  placeOrder() {
    this.selectedUser = this.userService.getUser();
    if (this.formGroup.value.quantity && this.formGroup.value.price) {
      this.isLoading = true;
      const data: Trade = {
        quantity: this.formGroup.value.quantity,
        price: this.formGroup.value.price,
        action: this.action,
        account: this.selectedUser,
      };
      this.orderFormService.placeOrder(data).subscribe(
        (response) => {
          this.isLoading = false;
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
