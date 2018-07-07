import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'random-game',
  templateUrl: './random-game.component.html',
  styleUrls: ['./random-game.component.scss']
})
export class RandomGameComponent implements OnInit {
  @Input() public gameWinner: string;

  constructor(private gameService: GameService) {}

  ngOnInit() {}
}
