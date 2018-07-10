import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { OptionInterface } from '../interfaces/option.interface';
import { PollInterface } from '../interfaces/poll.interface';
import { VoteInterface } from '../interfaces/vote.interface';
import { environment } from '../../environments/environment';

export const BASE_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${BASE_URL}/users`);
  }

  public getAllPolls(): Observable<PollInterface[]> {
    return this.http.get<PollInterface[]>(`${BASE_URL}/polls`);
  }

  public getPollById(id: number): Observable<PollInterface> {
    return this.http.get<PollInterface>(`${BASE_URL}/poll/${id}`);
  }

  public submitVote(vote: VoteInterface): Observable<any> {
    return this.http.post(`${BASE_URL}/vote`, vote);
  }

  public updateUsers(users: any): Observable<any> {
    return this.http.put(`${BASE_URL}/users`, users);
  }

  public updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/user/${id}`, data);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/user/${id}`);
  }

  public submitPoll(
    poll: PollInterface,
    options: OptionInterface[]
  ): Observable<any> {
    return this.http.post(`${BASE_URL}/poll`, { poll, options });
  }
}
