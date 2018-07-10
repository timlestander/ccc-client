import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserInterface } from '../../interfaces/user.interface';
import { PollInterface } from '../../interfaces/poll.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {}

  public users: UserInterface[];
  public polls: PollInterface[];
  public selectedUser: UserInterface;

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((response: any) => {
      this.users = response.data;
    });

    this.apiService.getAllPolls().subscribe((response: any) => {
      this.polls = response.data;
    });
  }

  public setSelectedUser(user: UserInterface): void {
    this.selectedUser = null;
    this.selectedUser = user;
  }

  public closeEdit(): void {
    this.selectedUser = null;
  }

  public deleteUser(id: number): void {
    this.apiService.deleteUser(id).subscribe((response: any) => {
      if (response.success) {
        this.toastService.addToast(
          'success',
          'Borttagning lyckades',
          'Användaren är nu borttagen'
        );
        this.users.forEach((user: UserInterface, i: number) => {
          if (user.id === id) {
            this.users.splice(i, 1);
          }
        });
      } else {
        this.toastService.addToast(
          'error',
          'Borttagning misslyckades',
          'Något gick fel. Försök igen'
        );
      }
    });
  }

  public deletePoll(id: number): void {
    this.apiService.deletePoll(id).subscribe((response: any) => {
      if (response.success) {
        this.toastService.addToast(
          'success',
          'Borttagning lyckades',
          'Ärendet är nu borttaget'
        );
        this.polls.forEach((poll: PollInterface, i: number) => {
          if (poll.id === id) {
            this.polls.splice(i, 1);
          }
        });
      } else {
        this.toastService.addToast(
          'error',
          'Borttagning misslyckades',
          'Något gick fel. Försök igen'
        );
      }
    });
  }
}
