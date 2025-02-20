import { Component, OnInit } from '@angular/core';
import { VideogiochiService } from '../videogiochi.service';
import { CategoriaService } from '../categoria.service';
import { CasaDiSviluppoService } from '../casa-di-sviluppo.service';
import { PiattaformaService } from '../piattaforma.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-videogiochi-update',
  imports: [FormsModule, CommonModule, ModalComponent],
  templateUrl: './videogioco-update.component.html',
  styleUrls: ['./videogioco-update.component.css'],
})
export class VideogiochiUpdateComponent implements OnInit {
  categoria: any[] = [];
  piattaforme: any[] = [];
  caseDiSviluppo: any[] = [];
  videogiochi: any[] = [];

  isModalOpen = false;
  selectedVideogioco: any = {
    id: null,
    titolo: '',
    piattaforma: { id: null },
    casaDiSviluppo: { id: null },
    categorie: [],
  };

  selectedCategorieIds: number[] = [];
  selectedPiattaformaId: number | null = null;
  selectedCasaDiSviluppoId: number | null = null;

  constructor(
    private videogiocoService: VideogiochiService,
    private categoriaService: CategoriaService,
    private casaDiSviluppoService: CasaDiSviluppoService,
    private piattaformaService: PiattaformaService
  ) {}

  ngOnInit(): void {
    this.loadVideogiochi();
    this.loadCategorie();
    this.loadCaseDiSviluppo();
    this.loadPiattaforme();
  }
  openModal() {
    this.isModalOpen = true;
  }

  onModalClosed() {
    this.isModalOpen = false;
  }

  loadVideogiochi(): void {
    this.videogiocoService.getAllVideogiochi().subscribe((data) => {
      this.videogiochi = data;
    });
  }

  loadCategorie(): void {
    this.categoriaService.getAllCategorie().subscribe((data) => {
      this.categoria = data;
    });
  }

  loadCaseDiSviluppo(): void {
    this.casaDiSviluppoService.getAllCasaDiSviluppo().subscribe((data) => {
      this.caseDiSviluppo = data;
    });
  }

  loadPiattaforme(): void {
    this.piattaformaService.getAllPiattaforma().subscribe((data) => {
      this.piattaforme = data;
    });
  }

  onCategoriaChange(event: any, categoriaId: number): void {
    if (event.target.checked) {
      this.selectedCategorieIds.push(categoriaId);
    } else {
      const index = this.selectedCategorieIds.indexOf(categoriaId);
      if (index > -1) {
        this.selectedCategorieIds.splice(index, 1);
      }
    }
  }

  selectVideogioco(videogioco: any): void {
    this.selectedVideogioco = { ...videogioco };
    this.selectedPiattaformaId = videogioco.piattaforma.id;
    this.selectedCasaDiSviluppoId = videogioco.casaDiSviluppo.id;
    this.selectedCategorieIds = videogioco.categorie.map((c: any) => c.id);
  }

  updateVideogioco(): void {
    if (!this.selectedVideogioco.titolo) {
      alert('Il titolo è obbligatorio.');
      return;
    }

    if (!this.selectedPiattaformaId) {
      alert('La piattaforma è obbligatoria.');
      return;
    }

    if (!this.selectedCasaDiSviluppoId) {
      alert('La casa di sviluppo è obbligatoria.');
      return;
    }

    const payload = {
      titolo: this.selectedVideogioco.titolo,
      piattaforma: { id: this.selectedPiattaformaId },
      casaDiSviluppo: { id: this.selectedCasaDiSviluppoId },
      categorie: this.selectedCategorieIds.map((id) => ({ id })),
    };

    console.log('Request Payload:', payload);

    this.videogiocoService
      .updateVideogiochi(this.selectedVideogioco.id, payload)
      .pipe(
        catchError((error) => {
          console.error('Error updating video game', error);
          alert(
            'Failed to update video game. Please check the console for more details.'
          );
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          alert('Videogioco aggiornato con successo!');
          this.resetForm();
          this.loadVideogiochi(); // Ricarica la lista dopo l'aggiornamento
          window.location.reload();
        }
      });
  }
  resetForm(): void {
    this.selectedVideogioco = {
      id: null,
      titolo: '',
      piattaforma: { id: null },
      casaDiSviluppo: { id: null },
      categorie: [],
    };
    this.selectedCategorieIds = [];
    this.selectedPiattaformaId = null;
    this.selectedCasaDiSviluppoId = null;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
