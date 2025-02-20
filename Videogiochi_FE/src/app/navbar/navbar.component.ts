import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { CarrelloService } from '../carrello.service';
import { RouterLink } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { NgIf } from '@angular/common';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, ChatbotComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isloginMode: boolean = true;
  totalCartPrice: number = 0;
  isChatbotOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private carrelloService: CarrelloService,
    private authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((loggedIn) => {
      this.isloginMode = !loggedIn;
    });

    this.carrelloService.total$.subscribe((total) => {
      this.totalCartPrice = total;
    });
  }

  isAdmin(): boolean {
    return this.authGuard.getUserRole() === 'matteo';
  }

  onCarrelloPush(): void {
    if (this.authService.isLoggedIn) {
    } else {
      alert('Devi aver effettuato il login per accedere al carrello');
      return;
    }
  }
  isLogged(): boolean {
    return this.authService.isLoggedIn;
  }

  onAssistenzaPush(): void {
    if (this.authService.isLoggedIn) {
    } else {
      alert("Devi aver effettuato il login per accedere all'assistenza");
      return;
    }
  }

  onSwitchMode(): void {
    if (this.isloginMode) {
      this.redirectToLogin();
    } else {
      this.logout();
    }
  }

  logout(): void {
    this.carrelloService.svuotaCarrello();
    this.authService.logout();
  }

  redirectToLogin(): void {
    this.router.navigate(['/auth']);
  }

  openChatbot(): void {
    if (!this.isLogged()) {
      alert('Devi aver effettuato il login per accedere al chatbot');
      this.router.navigate(['/login']);
      return;
    }
    this.isChatbotOpen = true;
  }

  closeChatbot(event: Event): void {
    event.stopPropagation();
    this.isChatbotOpen = false;
  }
}
