import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PollInterface } from '../../interfaces/poll.interface';
import { OptionInterface } from '../../interfaces/option.interface';
import { VoteInterface } from '../../interfaces/vote.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  public openPolls: PollInterface[] = [];
  public closedPolls: PollInterface[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiService.getAllPolls().subscribe((polls: PollInterface[]) => {
      this.extractData(polls);
    });
  }

  public extractData(polls: PollInterface[]): void {
    polls.forEach((poll: PollInterface) => {
      let totalVotes: number = 0;
      let found: boolean = false;
      poll.options.forEach((option: OptionInterface) => {
        option.votes.forEach((vote: VoteInterface) => {
          if (vote.userId === this.authService.user.id) {
            found = true;
          }
          totalVotes++;
        });
      });
      poll['totalVotes'] = totalVotes;
      found ? this.closedPolls.push(poll) : this.openPolls.push(poll);
    });
  }

  public getVoteCount(options: OptionInterface[]): number {
    let total = 0;
    options.forEach((option: OptionInterface) => {
      total += option.votes.length;
    });
    return total;
  }

  public goToPoll(pollId: number): void {
    this.router.navigateByUrl(`/poll/${pollId}`);
  }
}
