import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate() {
    if (!this.authService.isTokenExpired()) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
