import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { UserInterface } from '../interfaces/user.interface';
import { BASE_URL } from './api.service';

export const TOKEN_NAME: string = 'token';

@Injectable()
export class AuthService {
  public user: UserInterface;

  constructor(private http: HttpClient, private router: Router) {
    if (!this.isTokenExpired()) {
      this.user = jwt_decode(this.getToken());
      // console.log(this.user);
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
    if (decoded.exp === undefined) { return null; }
    const date = new Date(0);
    return date.setUTCSeconds(decoded.utc);
  }

  public isTokenExpired(token?: string) {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return true; }
    return date.valueOf() > new Date().valueOf();
  }

  public login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${BASE_URL}/login`, {
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
    return this.http.post(`${BASE_URL}/register`, user);
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
