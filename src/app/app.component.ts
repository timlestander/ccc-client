import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ApiServipce } from './services/api.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService, public apiService: ApiService, public gameService: GameService) {}
}
