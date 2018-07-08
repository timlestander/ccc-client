import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameServiceActive: boolean = false;
  private feeling: boolean = false;

  getGameStatus() {
    return this.gameServiceActive;
  }

  setActive() {
    this.gameServiceActive = true;
  }

  closeGame() {
    this.gameServiceActive = false;
  }

  getFeeling() {
    return this.feeling;
  }

  setFeeling(value) {
    this.feeling = value;
  }
}
