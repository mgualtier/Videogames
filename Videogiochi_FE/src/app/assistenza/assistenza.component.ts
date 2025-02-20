import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { AssistenzaService } from '../assistenza.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assistenza',
  templateUrl: './assistenza.component.html',
  imports: [FormsModule, NgForOf, NgIf],
  styleUrls: ['./assistenza.component.css'],
})
export class AssistenzaComponent implements OnInit {
  ordini: any[] = [];
  videogiochi: any[] = [];
  ordineSelezionato: any = null;
  videogiocoSelezionato: any = null;
  domanda: string = '';
  erroreCaricamento: string | null = null;
  email: string = '';

  constructor(
    private assistenzaService: AssistenzaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caricaOrdini();
  }

  caricaOrdini(): void {
    this.assistenzaService.getOrdiniByUser().subscribe({
      next: (data) => {
        this.ordini = data;
        this.erroreCaricamento = null;
      },
      error: (err) => {
        console.error('Errore nel caricamento degli ordini:', err);
        this.erroreCaricamento =
          'Errore nel caricamento degli ordini. Assicurati di aver effettuato il login.';
      },
    });
  }

  onOrdineSelezionato(): void {
    if (this.ordineSelezionato && this.ordineSelezionato.prodottiOrdine) {
      this.videogiochi = this.ordineSelezionato.prodottiOrdine.map(
        (prodotto: any) => prodotto.videogioco
      );
    } else {
      this.videogiochi = [];
    }
  }

  inviaDomanda(): void {
    if (
      !this.ordineSelezionato ||
      !this.videogiocoSelezionato ||
      !this.domanda.trim()
    ) {
      alert('Seleziona un ordine, un videogioco e inserisci una domanda.');
      return;
    }

    this.assistenzaService
      .inviaDomandaAssistenza(
        this.ordineSelezionato.id,
        this.domanda,
        this.email
      )
      .pipe(
        catchError((error) => {
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          this.domanda = '';
          alert('Domanda inviata con successo!');
          this.router.navigate(['/']);
        },
      });
  }
}
