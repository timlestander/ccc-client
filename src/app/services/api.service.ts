import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { PollInterface } from '../interfaces/poll.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.BASE_URL}/users`);
  }

  public getAllPolls(): Observable<PollInterface[]> {
    return this.http.get<PollInterface[]>(`${this.BASE_URL}/polls`);
  }

  public getPollById(id: number): Observable<PollInterface> {
    return this.http.get<PollInterface>(`${this.BASE_URL}/poll/${id}`);
  }
}
