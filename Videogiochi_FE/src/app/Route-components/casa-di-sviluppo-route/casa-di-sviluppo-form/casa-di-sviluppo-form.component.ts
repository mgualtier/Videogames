import { Component } from '@angular/core';
import { CasaDiSviluppoService } from '../../../casa-di-sviluppo.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../modal/modal.component';
@Component({
  selector: 'app-casa-di-sviluppo-form',
  imports: [FormsModule, ModalComponent],
  templateUrl: './casa-di-sviluppo-form.component.html',
  styleUrl: './casa-di-sviluppo-form.component.css',
})
export class CasaDiSviluppoFormComponent {
  isModalOpen = false;
  newCasaDiSviluppo: any = {
    nome: '',
    sede: '',
  };

  openModal() {
    this.isModalOpen = true;
  }

  onModalClosed() {
    this.isModalOpen = false;
  }

  constructor(private casadisvilupposervice: CasaDiSviluppoService) {}

  createCasaDiSviluppo() {
    if (!this.newCasaDiSviluppo.nome || !this.newCasaDiSviluppo.sede) {
      alert(
        'Devi riempire entrambi i campi per poter creare una nuova casa di sviluppo'
      );
      return;
    } else {
      this.casadisvilupposervice
        .createCasaDiSviluppo(this.newCasaDiSviluppo)
        .subscribe(
          (risposta) => {
            this.newCasaDiSviluppo = {};
          },
          (error) => {
            console.error(
              'Error occurred while creating Casa di Sviluppo:',
              error
            );
          }
        );
    }
    alert('Casa di sviluppo inserita!');
    window.location.reload();
  }
}
