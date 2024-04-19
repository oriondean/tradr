import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderFormComponent } from '../order-form/order-form.component';
import { PublicOrdersComponent } from './components/public-orders/public-orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderFormComponent, PublicOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tradr';
}
