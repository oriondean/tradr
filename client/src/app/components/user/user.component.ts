import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  users: string[] = ['Dean', 'Tom', 'Jesse', 'Gazelle'];

  constructor() {}

  onUserSelectionChange(event: any) {
    console.log(event.value);
  }
}
