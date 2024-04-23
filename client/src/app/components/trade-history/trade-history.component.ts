import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-trade-history',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './trade-history.component.html',
  styleUrl: './trade-history.component.css',
})
export class TradeHistoryComponent {
  constructor() {}
}
