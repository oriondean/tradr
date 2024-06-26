import { Injectable } from '@angular/core';
import { Client, messageCallbackType } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private client: Client;
  private resolved: () => void = () => 0;
  private connected: Promise<void> = new Promise<void>(
    (res) => (this.resolved = res)
  );

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/',
      onConnect: (e) => this.resolved(),
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

  subscribe(topic: string, callback: messageCallbackType): void {
    this.connected.then(() => this.client.subscribe(topic, callback));
  }

  publish<T>(topic: string, payload: T) {
    if (typeof payload === 'object') {
      return this.client.publish({
        destination: topic,
        body: JSON.stringify(payload),
      });
    }

    return this.client.publish({ destination: topic, body: String(payload) });
  }
}
