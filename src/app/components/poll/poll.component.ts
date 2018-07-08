import { Component, OnInit, HostListener } from '@angular/core';
import { PollInterface } from '../../interfaces/poll.interface';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VoteInterface } from '../../interfaces/vote.interface';
import { OptionInterface } from '../../interfaces/option.interface';

@Component({
  selector: 'poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  @HostListener('window:resize')
  public onResize(): void {
    this.view = [window.innerWidth - 120, window.innerWidth - 120];
  }

  public poll: PollInterface;
  public pollId: number;
  public hasVoted: boolean;
  public graphData: any[] = [];

  // Graph settings
  view = [window.innerWidth - 120, window.innerWidth - 120];
  autoScale = true;
  showLegend = false;
  showLabels = false;
  explodeSlices = true;
  doughnut = false;
  colorScheme = {
    domain: [
      'rgb(225, 151, 76)',
      'rgb(132, 186, 91)',
      'rgb(211, 94, 95)',
      'rgb(128, 133, 133)',
      'rgb(144, 103, 167)',
      'rgb(171, 104, 87)',
      'rgb(204, 194, 16)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)'
    ]
  };
  margin: [0, 0, 0, 0];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pollId = parseInt(params.get('id'));
      this.fetchData(this.pollId);
    });
  }

  public fetchData(pollId: number): void {
    this.apiService.getPollById(pollId).subscribe(
      (poll: PollInterface) => {
        this.poll = poll;
        this.extractVotes(poll);
        this.hasVoted = this.setVotedStatus(poll);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public submitVote(option: OptionInterface): void {
    let values: VoteInterface = {
      userId: this.authService.user.id,
      optionId: option.id,
      ok: this.authService.user.ok
    };
    this.apiService.submitVote(values).subscribe(
      (response: any) => {
        if (response.success) {
          this.fetchData(this.pollId);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public extractVotes(poll: PollInterface): void {
    this.graphData = [];
    poll.options.forEach((option: OptionInterface) => {
      this.graphData.push({
        name: option.text,
        value: this.calculateValue(option.votes)
      });
    });
  }

  public calculateValue(votes: VoteInterface[]): number {
    let total: number = 0;
    votes.forEach((vote: VoteInterface) => {
      console.log(vote.ok);
      total += vote.ok * 1;
    });
    return total;
  }

  public setVotedStatus(poll: PollInterface): boolean {
    let found: boolean = false;
    const userId = this.authService.user.id;
    poll.options.forEach((option: OptionInterface) => {
      return option.votes.forEach((vote: VoteInterface) => {
        if (vote.userId === this.authService.user.id) {
          found = true;
          return;
        }
      });
    });
    return found;
  }
}
