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
    // this.view = [window.innerWidth, window.innerWidth];
    console.log(window.innerWidth);
  }

  public poll: PollInterface;
  public pollId: number;
  public hasVoted: boolean;
  public graphData: any[] = [];

  // Graph settings
  view = [window.innerWidth, window.innerWidth];
  autoScale = false;
  showLegend = false;
  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
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
        console.log(this.setVotedStatus(poll));
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
