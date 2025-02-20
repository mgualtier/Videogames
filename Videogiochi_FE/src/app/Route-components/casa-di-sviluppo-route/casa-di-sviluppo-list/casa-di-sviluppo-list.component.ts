import { Component, OnInit } from '@angular/core';
import { CasaDiSviluppoService } from '../../../casa-di-sviluppo.service';

@Component({
  selector: 'app-casa-di-sviluppo-list',
  imports: [],
  templateUrl: './casa-di-sviluppo-list.component.html',
  styleUrl: './casa-di-sviluppo-list.component.css',
})
export class CasaDiSviluppoListComponent implements OnInit {
  casaDiSviluppo: any[] = [];

  ngOnInit(): void {
    this.loadCasaDiSviluppo();
  }

  constructor(private casadisvilupposervice: CasaDiSviluppoService) {}

  deleteCasaDiSviluppo(id: number): void {
    this.casadisvilupposervice.deleteCasaDiSviluppo(id).subscribe(
      () => {
        this.casaDiSviluppo = this.casaDiSviluppo.filter(
          (casa) => casa.id !== id
        );
        alert('Casa di sviluppo rimossa con successo!');
        this.loadCasaDiSviluppo();
      },
      (error) => {
        console.error('Errore nella rimozione della casa di sviluppo:', error);
        alert('Si è verificato un errore. Per favore riprova.');
      }
    );
  }
  loadCasaDiSviluppo() {
    this.casadisvilupposervice.getAllCasaDiSviluppo().subscribe((data) => {
      this.casaDiSviluppo = data;
    });
  }
}
