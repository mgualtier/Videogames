import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Funzione per ottenere il valore di un cookie
  getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)')
      );
      return match ? match[2] : null;
    }
    return null;
  }

  // Funzione per impostare un cookie
  setCookie(name: string, value: string, days: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + d.toUTCString();
      document.cookie = `${name}=${value}; ${expires}; path=/`;
    }
  }

  // Funzione per verificare se il consenso è già stato dato
  hasConsented(): boolean {
    return this.getCookie('cookieConsent') === 'true';
  }

  // Funzione per settare il consenso
  setConsent(consent: boolean): void {
    this.setCookie('cookieConsent', consent ? 'true' : 'false', 365);
  }
}
