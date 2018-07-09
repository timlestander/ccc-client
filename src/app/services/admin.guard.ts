import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate() {
    if (
      this.authService.user &&
      (this.authService.user.name === 'Tim Lestander' ||
        this.authService.user.admin)
    ) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
