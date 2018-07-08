import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameServiceActive: boolean = false;
  private feeling: boolean = false;
  private users: UserInterface[];

  getGameStatus() {
    return this.gameServiceActive;
  }

  setActive(users: UserInterface[]) {
    this.gameServiceActive = true;
    this.users = users;
  }

  closeGame() {
    this.gameServiceActive = false;
    this.users = null;
  }

  getFeeling() {
    return this.feeling;
  }

  setFeeling(value) {
    this.feeling = value;
  }
}
