import { ModalComponent } from '../../../modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { VideogiochiService } from '../../../videogiochi.service';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../categoria.service';
import { CasaDiSviluppoService } from '../../../casa-di-sviluppo.service';
import { PiattaformaService } from '../../../piattaforma.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-videogiochi-form',
  imports: [FormsModule, ModalComponent],
  templateUrl: './videogiochi-form.component.html',
  styleUrl: './videogiochi-form.component.css',
})
export class VideogiochiFormComponent implements OnInit {
  categoria: any[] = [];
  piattaforme: any[] = [];
  caseDiSviluppo: any[] = [];
  selectedFile: File | null = null;
  isModalOpen = false;

  newVideogioco: any = {
    titolo: '',
    piattaforma: {},
    casaDiSviluppo: {},
    categorie: [{}],
    prezzo: 0,
    quantitaDisponibile: 0,
    immagineUrl: '',
    trailerUrl: '',
  };

  selectedCategoriaId: number | null = null;
  selectedPiattaformaId: number | null = null;
  selectedCasaDiSviluppoId: number | null = null;
  selectedCategorieIds: number[] = [];

  constructor(
    private videogiocoService: VideogiochiService,
    private categoriaService: CategoriaService,
    private casaDiSviluppoService: CasaDiSviluppoService,
    private piattaformaService: PiattaformaService
  ) {}

  ngOnInit(): void {
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  createVideogioco(): void {
    if (!this.newVideogioco.titolo) {
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

    // Creazione del payload JSON
    const payload = {
      titolo: this.newVideogioco.titolo,
      piattaforma: { id: this.selectedPiattaformaId },
      casaDiSviluppo: { id: this.selectedCasaDiSviluppoId },
      categorie: this.selectedCategorieIds.map((id) => ({ id })),
      prezzo: this.newVideogioco.prezzo,
      quantitaDisponibile: this.newVideogioco.quantitaDisponibile,
      immagineUrl: this.newVideogioco.immagineUrl,
      trailerUrl: this.newVideogioco.trailerUrl,
    };

    // Chiamata HTTP con JSON
    this.videogiocoService.createVideogiochi(payload).subscribe(
      (response) => {
        alert('Videogioco creato con successo!');
        window.location.reload();
        this.resetForm();
      },
      (error) => {
        console.error('Errore durante la creazione del videogioco', error);
        alert('Errore nella creazione del videogioco.');
      }
    );
  }

  resetForm(): void {
    this.newVideogioco = {
      titolo: '',
      piattaforma: {},
      casaDiSviluppo: {},
      categorie: [{}],
      prezzo: 0,
      quantitaDisponibile: 0,
      immagineUrl: '',
      trailerUrl: '',
    };
    this.selectedCategoriaId = null;
    this.selectedPiattaformaId = null;
    this.selectedCasaDiSviluppoId = null;
  }
}
