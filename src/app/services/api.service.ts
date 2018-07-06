import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { OptionInterface } from '../interfaces/option.interface';
import { PollInterface } from '../interfaces/poll.interface';
import { VoteInterface } from '../interfaces/vote.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Change localhost to ip client is hosted on e.g., ng serve --host 192.168.1.38
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

  public submitVote(vote: VoteInterface): Observable<any> {
    return this.http.post(`${this.BASE_URL}/vote`, vote);
  }

  public updateUsers(users: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/users`, users);
  }

  public submitPoll(
    poll: PollInterface,
    options: OptionInterface[]
  ): Observable<any> {
    console.log(options);
    return this.http.post(`${this.BASE_URL}/poll`, { poll, options });
  }
}
