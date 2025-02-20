import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../categoria.service';

@Component({
  selector: 'app-categoria-list',
  imports: [],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css',
  standalone: true,
})
export class CategoriaListComponent implements OnInit {
  categoria: any[] = [];

  constructor(private categoriaService: CategoriaService) {}

  loadCategoria() {
    this.categoriaService.getAllCategorie().subscribe((data) => {
      this.categoria = data;
    });
  }

  deleteCategoria(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe(
      () => {
        this.categoria = this.categoria.filter((cate) => cate.id != id);
        alert('Categoria rimossa con successo!');
        window.location.reload();
      },
      (error) => {
        console.error('Errore nella rimozione', error);
        alert('Si è verificato un errore. Per favore riprova.');
      }
    );
  }

  ngOnInit(): void {
    this.loadCategoria();
  }
}
