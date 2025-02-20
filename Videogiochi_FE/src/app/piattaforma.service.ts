import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PiattaformaService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:8080/api/piattaforme';

  getAllPiattaforma(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getPiattaformaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  createPiattaforma(Piattaforma: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, Piattaforma);
  }

  updatePiattaforma(id: number, updatedPiattaforma: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedPiattaforma);
  }
  deletePiattaforma(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
