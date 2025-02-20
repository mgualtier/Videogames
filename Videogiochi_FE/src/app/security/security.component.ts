import { Component } from '@angular/core';
import { LoginComponent } from './login/login/login.component';

@Component({
  selector: 'app-security',
  imports: [LoginComponent],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css',
})
export class SecurityComponent {}
