import { Component } from '@angular/core';
import { VideogiochiListComponent } from './videogiochi-list/videogiochi-list.component';
import { VideogiochiFormComponent } from './videogiochi-form/videogiochi-form.component';
import { VideogiochiUpdateComponent } from '../../videogioco-update/videogioco-update.component';

@Component({
  selector: 'app-videogiochi-route',
  imports: [
    VideogiochiListComponent,
    VideogiochiFormComponent,
    VideogiochiUpdateComponent,
  ],
  templateUrl: './videogiochi-route.component.html',
  styleUrl: './videogiochi-route.component.css',
})
export class VideogiochiRouteComponent {}
