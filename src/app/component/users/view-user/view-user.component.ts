import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/Users';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent implements OnInit {
  arrUsers: Users[] = [];
  selectedUserId: string | undefined;
  selectedUser: Users | undefined;
  userId:string =''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.arrUsers = users;
    });
  }

  onUserSelected(evt: any): void {
    const selectedUserId = parseInt(evt.target.value, 10);
    this.userId = selectedUserId.toString();
    console.log(this.userId)
    this.selectedUserId = this.userId;
    this.selectedUser = this.arrUsers.find(user => user.id == this.userId);
    console.log(this.selectedUser)
  }
}
