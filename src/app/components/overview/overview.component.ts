import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UserInterface } from '../../interfaces/user.interface';
import { PollInterface } from '../../interfaces/poll.interface';
import { GameService } from '../../services/game.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public users: UserInterface[];
  public clickTimer: any;
  public clicks: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private gameService: GameService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((response: any) => {
      if (response.success) {
        this.users = response.data;
      } else {
        this.toastService.addDefaultError();
      }
    });
  }

  public flagClicked(): void {
    this.gameService.setActive();
    // clearTimeout(this.clickTimer);
    // this.clicks++;
    // this.clickTimer = setTimeout(() => {
    //   this.clicks = 0;
    // }, 300);
    // if (this.clicks === 3) {
    //   this.gameService.setActive();
    // }
  }

  public getPosition(item: number, length: number): Object {
    const angle: number = (360 / length) * item;
    const y: number = Math.sin((angle * Math.PI) / 180);
    const x: number = Math.cos((angle * Math.PI) / 180);

    return {
      position: 'relative',
      top: y * 130 + 'px',
      left: x * 130 + 'px'
    };
  }
}
