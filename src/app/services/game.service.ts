import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameServiceActive: boolean = false;

  getGameStatus() {
    return this.gameServiceActive;
  }

  setActive() {
    this.gameServiceActive = true;
  }

  closeGame() {
    this.gameServiceActive = false;
  }
}
