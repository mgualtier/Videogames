import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:8080/api/categorie';

  getAllCategorie(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getCategoriaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  createCategoria(Categoria: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, Categoria);
  }

  updateCategoria(id: number, updatedCategoria: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedCategoria);
  }
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
