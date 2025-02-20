import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AssistenzaService {
  private apiUrl = 'http://localhost:8080/api/ordini';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrdiniByUser(): Observable<any[]> {
    const idUtente = this.authService.getUserId();

    if (!idUtente) {
      console.error('ID utente non disponibile!');
      return throwError(() => new Error('ID utente non disponibile!'));
    }

    return this.http.get<any[]>(
      `http://localhost:8080/api/ordini/utente/${idUtente}`
    );
  }

  inviaDomandaAssistenza(
    ordineId: number,
    domanda: string,
    email: string
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${ordineId}/assistenza`,
      { domanda, email },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
