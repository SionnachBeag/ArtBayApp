import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    const token: string = this.auth.getToken();

    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      jwt_decode(token);
      return true;
    } catch (err) {
      this.router.navigate(['/']);
      return false;
    }
  }
}
