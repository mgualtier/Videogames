import { Component } from '@angular/core';
import { CategoriaService } from '../../../categoria.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../modal/modal.component';
@Component({
  selector: 'app-categoria-form',
  imports: [FormsModule, ModalComponent],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css',
  standalone: true,
})
export class CategoriaFormComponent {
  isModalOpen = false;
  newCategoria: any = {
    nome: '',
  };

  constructor(private categoriaService: CategoriaService) {}

  openModal() {
    this.isModalOpen = true;
  }

  onModalClosed() {
    this.isModalOpen = false;
  }
  createCategoria() {
    if (!this.newCategoria.nome) {
      alert('Devi riempire il campo categoria');
      return;
    } else {
      this.categoriaService
        .createCategoria(this.newCategoria)
        .subscribe((risposta) => {
          this.newCategoria = {};
        });
    }
    alert('Categoria inserita!');
    window.location.reload();
  }
}
