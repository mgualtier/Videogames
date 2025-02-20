import { Routes } from '@angular/router';
import { CategoriaRouteComponent } from './Route-components/categoria-route/categoria-route.component';
import { CategoriaFormComponent } from './Route-components/categoria-route/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './Route-components/categoria-route/categoria-list/categoria-list.component';
import { HomeComponent } from './home/home.component';
import { PiattaformaRouteComponent } from './Route-components/piattaforma-route/piattaforma-route.component';
import { PiattaformaFormComponent } from './Route-components/piattaforma-route/piattaforma-form/piattaforma-form.component';
import { PiattaformaListComponent } from './Route-components/piattaforma-route/piattaforma-list/piattaforma-list.component';
import { CasaDiSviluppoRouteComponent } from './Route-components/casa-di-sviluppo-route/casa-di-sviluppo-route.component';
import { CasaDiSviluppoListComponent } from './Route-components/casa-di-sviluppo-route/casa-di-sviluppo-list/casa-di-sviluppo-list.component';
import { VideogiochiRouteComponent } from './Route-components/videogiochi-route/videogiochi-route.component';
import { VideogiochiFormComponent } from './Route-components/videogiochi-route/videogiochi-form/videogiochi-form.component';
import { VideogiochiListComponent } from './Route-components/videogiochi-route/videogiochi-list/videogiochi-list.component';
import { AuthGuard } from './auth-guard.service';
import { SecurityComponent } from './security/security.component';
import { CarrelloComponent } from './Route-components/carrello/carrello.component';
import { CheckoutComponent } from './Route-components/checkout/checkout.component';
import { AssistenzaComponent } from './assistenza/assistenza.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'assistenza', component: AssistenzaComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'auth',
    component: SecurityComponent,
  },
  {
    path: 'carrello',
    component: CarrelloComponent,
  },
  { path: 'login', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'categorie',
    component: CategoriaRouteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CategoriaFormComponent },
      { path: '', component: CategoriaListComponent },
    ],
  },
  {
    path: 'piattaforme',
    component: PiattaformaRouteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PiattaformaFormComponent },
      { path: '', component: PiattaformaListComponent },
    ],
  },
  {
    path: 'casa-di-sviluppo',
    component: CasaDiSviluppoRouteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CasaDiSviluppoListComponent },
      { path: '', component: CasaDiSviluppoListComponent },
    ],
  },
  {
    path: 'videogiochi',
    component: VideogiochiRouteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: VideogiochiFormComponent },
      { path: '', component: VideogiochiListComponent },
    ],
  },
];
