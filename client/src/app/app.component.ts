import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { PublicOrdersComponent } from './components/public-orders/public-orders.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PrivateOrderBookComponent } from './components/private-order-book/private-order-book.component';
import { TradeHistoryComponent } from './components/trade-history/trade-history.component';
import { UserComponent } from './components/user/user.component';
import { StompService } from './services/api/Stomp.service';
import { DepthChartComponent } from './components/depth-chart/depth-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    OrderFormComponent,
    PublicOrdersComponent,
    MatToolbarModule,
    PrivateOrderBookComponent,
    TradeHistoryComponent,
    UserComponent,
    DepthChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tradr';

  constructor(stompService: StompService) {
    stompService.connect();
  }
}
