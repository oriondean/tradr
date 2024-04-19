import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderFormComponent } from '../order-form/order-form.component';
import { Client } from '@stomp/stompjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tradr';

  constructor() {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/',
      onConnect: (frame) => {
        console.log('connected', frame);

        client.subscribe('/topic/trades', (greeting) => {
          console.log('trade inbound', JSON.parse(greeting.body));
        });
      },
      onStompError: (e) => console.log('onStompError', e),
      onWebSocketError: (e) => console.log('onWebsocketError', e.message)
    });

    client.activate();
  }
}
