import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideogiochiService {
  constructor(private http: HttpClient) {}
  videogioco: any;
  baseUrl: string = 'http://localhost:8080/api/videogiochi';

  getPrezzoById(id: number): number {
    this.videogioco = this.getVideogiochiById(id);
    return this.videogioco.prezzo;
  }

  getAllVideogiochi(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getVideogiochiById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  createVideogiochi(videogioco: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/upload', videogioco, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateVideogiochi(id: number, updateVideogiochi: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updateVideogiochi);
  }
  deleteVideogiochi(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  uploadVideogioco(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
