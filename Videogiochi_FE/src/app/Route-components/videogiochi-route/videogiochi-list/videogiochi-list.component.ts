import { Component, OnInit } from '@angular/core';
import { VideogiochiService } from '../../../videogiochi.service';

@Component({
  selector: 'app-videogiochi-list',
  imports: [],
  templateUrl: './videogiochi-list.component.html',
  styleUrl: './videogiochi-list.component.css',
})
export class VideogiochiListComponent implements OnInit {
  videogioco: any[] = [];

  constructor(private videogiochiservice: VideogiochiService) {}

  deleteVideogioco(id: number) {
    this.videogiochiservice.deleteVideogiochi(id).subscribe(
      () => {
        // Filtra l'array rimuovendo il videogioco con l'id selezionato
        this.videogioco = this.videogioco.filter((gioco) => gioco.id !== id);
        alert('Videogioco rimosso con successo!');
      },
      (error) => {
        console.error('Errore nella rimozione', error);
        alert('Si è verificato un errore. Per favore riprova.');
      }
    );
  }

  loadVideogiochi() {
    this.videogiochiservice.getAllVideogiochi().subscribe((data) => {
      this.videogioco = data;
    });
  }

  ngOnInit(): void {
    this.loadVideogiochi();
  }
}
