import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (this.authService.isLoggedIn && user.username === 'matteo') {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
  getUserRole(): string | null {
    const user = this.authService.getUser();
    return user ? user.username : null;
  }
}
