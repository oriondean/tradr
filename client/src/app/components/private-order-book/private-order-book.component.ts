import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-private-order-book',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './private-order-book.component.html',
  styleUrl: './private-order-book.component.css',
})
export class PrivateOrderBookComponent {
  constructor() {}
}
