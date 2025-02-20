import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/user';

  private token: string | null = null;
  private isBrowser: boolean;
  private userId: number | null = null;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    if (this.isBrowser) {
      this.token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');

      if (this.token && userId) {
        this.isAuthenticatedSubject.next(true);
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    }
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => {
        if (response && response.user) {
          sessionStorage.setItem('user', JSON.stringify(response.user));
          sessionStorage.setItem('userId', response.user.id.toString());
          this.token = response.token;
          if (this.isBrowser) {
            sessionStorage.setItem('token', response.token);
          }
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    this.token = null;
    this.isAuthenticatedSubject.next(false);

    if (this.isBrowser) {
      sessionStorage.removeItem('token');
      sessionStorage.clear();
    }
    this.router.navigate(['/']);
    alert('Logout eseguito con successo!');
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    return headers;
  }
  getUserId(): number | null {
    if (this.isBrowser) {
      const storedUserId = sessionStorage.getItem('userId');
      this.userId = storedUserId !== null ? parseInt(storedUserId, 10) : null;
      return this.userId;
    }
    return null;
  }

  getUser(): any {
    if (this.isBrowser) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}
