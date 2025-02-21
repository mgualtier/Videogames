import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from '../cookie-consent.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css'],
  imports: [NgIf],
})
export class CookieBannerComponent implements OnInit {
  showBanner: boolean = false;

  constructor(private cookieConsentService: CookieConsentService) {}

  ngOnInit(): void {
    this.showBanner = !this.cookieConsentService.hasConsented();
  }

  acceptCookies(): void {
    this.cookieConsentService.setConsent(true);
    this.showBanner = false;
  }

  declineCookies(): void {
    this.cookieConsentService.setConsent(false);
    this.showBanner = false;
  }
}
