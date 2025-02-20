import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { AuthService} from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8080/chatbot/message';

  constructor(private http: HttpClient, private authService: AuthService) {}

  sendMessage(message: string): Observable<string> {
    const userId = this.authService.getUserId();
    if (!userId) {
      return new Observable(observer => {
        observer.error('Utente non autenticato.');
        observer.complete();
      });
    }

    const payload = { message, userId };
    return this.http.post<{ message: string }>(this.apiUrl, payload).pipe(
      map(response => response.message)  // Estrarre solo il messaggio
    );
  }

}
