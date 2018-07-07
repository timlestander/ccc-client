import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public gameWinner: string;

  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {
    this.gameService.gameStatus.subscribe((name: string) => {
      this.gameWinner = name;
    });
  }
}
