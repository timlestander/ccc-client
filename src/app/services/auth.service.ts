import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserInterface } from '../interfaces/user.interface';
import { debug } from 'util';
import { environment } from '../../environments/environment';

export const TOKEN_NAME: string = 'token';

@Injectable()
export class AuthService {
  //Change localhost to ip client is hosted on e.g., ng serve --host 192.168.1.38
  private BASE_URL: string = environment.apiUrl;

  public user: UserInterface;

  constructor(private http: HttpClient, private router: Router) {
    if (!this.isTokenExpired()) {
      this.user = jwt_decode(this.getToken());
      console.log(this.user);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  public getTokenExpirationDate(token: string): number {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    return date.setUTCSeconds(decoded.utc);
  }

  public isTokenExpired(token?: string) {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return true;
    return date.valueOf() > new Date().valueOf();
  }

  public login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/login`, {
        username,
        password
      })
      .pipe(
        tap((response: any) => {
          if (response.success && response.data.token) {
            this.user = jwt_decode(response.data.token);
            this.setToken(response.data.token);
          }
        })
      );
  }

  public register(user: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, user);
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigateByUrl('/login');
  }

  public get isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }

  public get isLoggedOut(): boolean {
    return !this.isLoggedIn;
  }
}
