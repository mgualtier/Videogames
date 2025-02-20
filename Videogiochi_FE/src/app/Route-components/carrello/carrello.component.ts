import { Component, OnInit } from '@angular/core';
import { CarrelloService } from '../../carrello.service';
import { AuthService } from '../../auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'carrello-home',
  templateUrl: 'carrello.component.html',
  styleUrls: ['carrello.component.css'],
  imports: [FormsModule, CommonModule, RouterLink],
})
export class CarrelloComponent implements OnInit {
  videogiochiCarrello: any[] = [];
  userId: number | null = null;

  constructor(
    private carrelloService: CarrelloService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user && user.id) {
      this.userId = user.id;
      console.log('ID utente ottenuto:', this.userId);
      this.carrelloService.setUtenteId(this.userId);
      this.aggiornaCarrello();
    } else {
      console.error("Errore: impossibile ottenere l'ID utente.");
    }
  }
  calcolaPrezzoTotale(): number {
    return this.videogiochiCarrello.reduce(
      (acc, item) => acc + item.prezzo * item.quantita,
      0
    );
  }

  aggiornaCarrello(): void {
    const carrello = this.carrelloService.getCarrello();
    this.videogiochiCarrello = carrello.prodottiOrdine || [];
  }

  deleteVideogioco(videogiocoId: number): void {
    this.carrelloService.rimuoviDalCarrello(videogiocoId).subscribe(() => {
      this.videogiochiCarrello = this.videogiochiCarrello.filter(
        (gioco) => gioco.id !== videogiocoId
      );
      this.aggiornaCarrello();
    });
  }

  isCarrelloVuoto(): boolean {
    return this.videogiochiCarrello.length === 0;
  }

  deleteAll(): void {
    this.carrelloService.svuotaCarrello();
    this.videogiochiCarrello = [];
  }
}
