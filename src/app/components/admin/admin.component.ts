import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  public users: UserInterface[];
  public selectedUser: UserInterface;

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((response: any) => {
      this.users = response.data;
    });
  }

  public setSelectedUser(user: UserInterface): void {
    this.selectedUser = null;
    this.selectedUser = user;
  }

  public closeEdit(): void {
    this.selectedUser = null;
  }
}
