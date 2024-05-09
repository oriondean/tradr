import { Injectable } from '@angular/core';
import { LocalService } from '../local.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private localStore: LocalService) {}

  setUser(user: string) {
    this.localStore.saveData('user', user);
  }

  getUser(): string {
    const user = this.localStore.getData('user') || '';
    return user
  }
}
