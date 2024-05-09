import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  users: string[] = ['Dean', 'Tom', 'Jesse', 'Gazell'];

  selectedUser = localStorage.getItem('user') || 'Dean';

  constructor(private localStore: LocalService) {}

  getSelectedUser() {
    return this.localStore.getData('user');
  }
  onUserSelectionChange(event: any) {
    this.selectedUser = event.value;
    this.localStore.saveData('user', event.value);
  }
}
