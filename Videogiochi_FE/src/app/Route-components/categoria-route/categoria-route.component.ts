import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';

@Component({
  selector: 'app-categoria-route',
  imports: [CategoriaFormComponent, CategoriaListComponent, RouterLink],
  templateUrl: './categoria-route.component.html',
  styleUrl: './categoria-route.component.css',
})
export class CategoriaRouteComponent {}
