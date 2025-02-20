import { Component, OnInit } from '@angular/core';
import { PiattaformaService } from '../../../piattaforma.service';

@Component({
  selector: 'app-piattaforma-list',
  templateUrl: './piattaforma-list.component.html',
  styleUrls: ['./piattaforma-list.component.css'],
})
export class PiattaformaListComponent implements OnInit {
  piattaforma: any[] = [];

  constructor(private piattaformaService: PiattaformaService) {}

  ngOnInit(): void {
    this.loadPiattaforma();
  }

  deletePiattaforma(id: number) {
    this.piattaformaService.deletePiattaforma(id).subscribe(
      () => {
        this.piattaforma = this.piattaforma.filter((piatta) => piatta.id != id);
        alert('Piattaforma rimossa con successo');
        window.location.reload();
      },
      (error) => {
        console.error('Errore nella rimozione', error);
        alert('Si è verificato un errore. Per favore riprova.');
      }
    );
  }

  loadPiattaforma() {
    // Subscribe serve perche getall ritorna un Observable e estrapola il tipo di dato da esso
    this.piattaformaService.getAllPiattaforma().subscribe((data) => {
      this.piattaforma = data;
    });
  }
}
