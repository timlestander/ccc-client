import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { UserInterface } from '../../interfaces/user.interface';
import { PollInterface } from '../../interfaces/poll.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public users: UserInterface[];
  public openPolls: PollInterface[];

  public get feeling(): boolean { return this._feeling; }
  public set feeling(value: boolean) {
    this._feeling = value;
    this.gameService.setFeeling(value);
  }
  private _feeling: boolean = false;

  constructor(private apiService: ApiService, private router: Router, public gameService: GameService) { }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe(
      (data: UserInterface[]) => {
        this.users = data;
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.apiService.getAllPolls().subscribe(
      (data: PollInterface[]) => {
        this.openPolls = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public goToPoll(id: number): void {
    this.router.navigateByUrl(`/poll/${id}`);
  }
}
