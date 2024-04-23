import { Injectable } from '@angular/core';
import { Client, messageCallbackType, StompSubscription } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/',
      onConnect: (e) => console.log('connected', e),
      onStompError: (e) => console.log('onStompError', e),
      onWebSocketError: (e) => console.log('onWebsocketError', e.message),
    });
  }

  connect(): void {
    return this.client.activate();
  }

  disconnect(): Promise<void> {
    return this.client.deactivate();
  }

  subscribe(topic: string, callback: messageCallbackType): StompSubscription {
    return this.client.subscribe(topic, callback);
  }

  publish<T>(topic: string, payload: T) {
    if (typeof payload === 'object') {
      return this.client.publish({ destination: topic, body: JSON.stringify(payload) });
    }

    return this.client.publish({ destination: topic, body: String(payload) });
  }
}
