import { Component } from '@angular/core';
import { CasaDiSviluppoFormComponent } from './casa-di-sviluppo-form/casa-di-sviluppo-form.component';
import { CasaDiSviluppoListComponent } from './casa-di-sviluppo-list/casa-di-sviluppo-list.component';

@Component({
  selector: 'app-casa-di-sviluppo-route',
  imports: [CasaDiSviluppoFormComponent, CasaDiSviluppoListComponent],
  templateUrl: './casa-di-sviluppo-route.component.html',
  styleUrl: './casa-di-sviluppo-route.component.css',
})
export class CasaDiSviluppoRouteComponent {}
