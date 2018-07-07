import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameStatus: Subject<string> = new Subject<string>();

  constructor() {}

  public startGame(winner): void {
    this.gameStatus.next(winner);
  }

  public endGame(): void {
    this.gameStatus.next(null);
  }
}
