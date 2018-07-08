import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GameService } from '../../services/game.service';
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

  public get feeling(): boolean { return this._feeling; }
  public set feeling(value: boolean) {
    this._feeling = value;
    this.gameService.setFeeling(value);
  }
  private _feeling: boolean = false;

  constructor(private apiService: ApiService, private router: Router, public gameService: GameService) { }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((response: any) => {
      if (response.success) {
        this.users = response.data;
      } else {
        console.log('hwat');
        this.toastService.addDefaultError();
      }
    });
  }

  public flagClicked(): void {
    clearTimeout(this.clickTimer);
    this.clicks++;
    this.clickTimer = setTimeout(() => {
      this.clicks = 0;
    }, 300);
    if (this.clicks === 3) {
      this.startRandomGame();
    }
  }

  public startRandomGame(): void {
    let idx: number = Math.floor(Math.random() * this.users.length);
    this.gameService.startGame(this.users[idx].name);
  }
}
