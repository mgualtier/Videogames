import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CasaDiSviluppoService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:8080/api/casadisviluppo';

  getAllCasaDiSviluppo(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getCasaDiSviluppoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  createCasaDiSviluppo(casaDiSviluppo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, casaDiSviluppo);
  }

  updateCasaDiSviluppo(
    id: number,
    updatedCasaDiSviluppo: any
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedCasaDiSviluppo);
  }
  deleteCasaDiSviluppo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
