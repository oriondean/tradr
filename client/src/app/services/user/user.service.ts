import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: string = '';

  constructor() {}

  setUser(user: string) {
    this.user = user;
  }

  getUser(): string {
    return this.user;
  }
}
