import { Component, OnInit } from '@angular/core';
import { PiattaformaService } from '../../../piattaforma.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../modal/modal.component';
@Component({
  selector: 'app-piattaforma-form',
  imports: [FormsModule, ModalComponent],
  templateUrl: './piattaforma-form.component.html',
  styleUrl: './piattaforma-form.component.css',
})
export class PiattaformaFormComponent {
  isModalOpen = false;
  newPiattaforma: any = {
    nome: '',
    produttore: '',
  };

  constructor(private piattaformaService: PiattaformaService) {}
  openModal() {
    this.isModalOpen = true;
  }

  onModalClosed() {
    this.isModalOpen = false;
  }

  createPiattaforma() {
    if (!this.newPiattaforma.nome || !this.newPiattaforma.produttore) {
      alert('Devi compilare entrambi i campi');
      return;
    } else {
      this.piattaformaService
        .createPiattaforma(this.newPiattaforma)
        .subscribe((risposta) => {
          this.newPiattaforma = {};
        });
    }
    alert('Piattaforma inserita!');
    window.location.reload();
  }
}
