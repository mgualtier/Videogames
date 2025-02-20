import { Component } from '@angular/core';
import { PiattaformaListComponent } from './piattaforma-list/piattaforma-list.component';
import { PiattaformaFormComponent } from './piattaforma-form/piattaforma-form.component';

@Component({
  selector: 'app-piattaforma-route',
  imports: [PiattaformaListComponent, PiattaformaFormComponent],
  templateUrl: './piattaforma-route.component.html',
  styleUrl: './piattaforma-route.component.css',
})
export class PiattaformaRouteComponent {}
