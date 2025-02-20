import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService {
  private apiUrl = 'http://localhost:8080/api/ordini';
  private utenteId: number | null = null;
  private prodottiOrdine: any[] = [];
  private carrelloKey = 'carrello';
  // Existing property (if used for something else)
  videogiochiCarrello: any[] = [];
  private isBrowser: boolean;

  // NEW: BehaviorSubject for total price
  private totalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  total$ = this.totalSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadCarrello();
    // Update the total upon initialization:
    this.updateTotal();
  }

  setUtenteId(id: number | null): void {
    this.utenteId = id;
  }

  private saveCarrello(): void {
    if (this.isBrowser) {
      sessionStorage.setItem(
        this.carrelloKey,
        JSON.stringify(this.prodottiOrdine)
      );
    }
  }

  private loadCarrello(): void {
    if (this.isBrowser) {
      const savedCarrello = sessionStorage.getItem(this.carrelloKey);
      if (savedCarrello) {
        this.prodottiOrdine = JSON.parse(savedCarrello);
      }
    }
  }

  // NEW: Function to update the total price and publish it
  private updateTotal(): void {
    const total = this.prodottiOrdine.reduce(
      (acc, item) => acc + item.prezzo * item.quantita,
      0
    );
    this.totalSubject.next(total);
  }

  aggiungiAlCarrello(
    videogiocoId: number,
    quantità: number = 1,
    titolo: string,
    prezzo: number
  ): Observable<any> {
    const prodottoEsistente = this.prodottiOrdine.find(
      (prodotto) => prodotto.videogioco.id === videogiocoId
    );

    if (prodottoEsistente) {
      prodottoEsistente.quantita += quantità;
    } else {
      this.prodottiOrdine.push({
        videogioco: { id: videogiocoId },
        quantita: quantità,
        titolo,
        prezzo,
      });
    }

    this.saveCarrello();
    this.updateTotal();
    return of({ success: true, prodottiOrdine: this.prodottiOrdine });
  }

  rimuoviDalCarrello(videogiocoId: number): Observable<any> {
    this.prodottiOrdine = this.prodottiOrdine.filter(
      (prodotto) => prodotto.videogioco.id !== videogiocoId
    );

    this.saveCarrello();
    this.updateTotal();
    return of({ success: true, prodottiOrdine: this.prodottiOrdine });
  }

  getCarrello(): any {
    return {
      utente: { id: this.utenteId },
      prodottiOrdine: this.prodottiOrdine,
    };
  }

  inviaOrdine(ordine: any): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, ordine, { headers });
  }

  svuotaCarrello(): void {
    this.prodottiOrdine = [];
    this.saveCarrello();
    this.updateTotal();
  }
}
