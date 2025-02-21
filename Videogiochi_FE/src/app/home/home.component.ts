import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VideogiochiService } from '../videogiochi.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrelloService } from '../carrello.service';
import { register } from 'swiper/element/bundle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeStyle } from '@angular/platform-browser';
import { CookieBannerComponent } from '../Cookie-banner/cookie-banner.component';
@Component({
  selector: 'app-home',
  imports: [NgClass, FormsModule, CookieBannerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videogiochi: any[] = [];
  filteredVideogiochi: any[] = [];
  searchText: string = '';
  isloginMode: boolean = true;
  trailerUrl: SafeResourceUrl | null = null;
  isTrailerVisible: { [key: number]: boolean } = {};
  modalAperto: number | null = null;
  baseImg: string = '/assets/images/cropped-Videogiochi-a-scuola.webp';

  constructor(
    private videogiocoService: VideogiochiService,
    private carrelloService: CarrelloService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    register();
    this.loadVideogiochi();
  }

  loadVideogiochi(): void {
    this.videogiocoService.getAllVideogiochi().subscribe((data) => {
      this.videogiochi = data.map((v: any) => {
        return {
          ...v,
          trailer: this.getSafeTrailerUrl(v.trailerUrl),
        };
      });
      this.filteredVideogiochi = this.videogiochi;
    });
  }

  getTrailerUrl(): SafeResourceUrl | null {
    if (this.modalAperto !== null) {
      const videogioco = this.filteredVideogiochi.find(
        (v) => v.id === this.modalAperto
      );
      return videogioco ? videogioco.trailer : null;
    }
    return null;
  }
  getSafeImageUrl(immagineUrl: string | null): SafeStyle {
    const url =
      immagineUrl && immagineUrl.trim() !== '' ? immagineUrl : this.baseImg;
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  getSafeTrailerUrl(url: string | null): SafeResourceUrl {
    if (!url) {
      console.error('URL nullo ricevuto');
      return '';
    }

    const videoIdMatch = url.match(
      /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      console.error("Impossibile estrarre l'ID del video:", url);
      return '';
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  aggiungiAlCarrello(
    videogiocoId: number,
    quantita: number,
    titolo: string
  ): void {
    this.videogiocoService
      .getVideogiochiById(videogiocoId)
      .subscribe((data) => {
        const prezzo = data.prezzo;
        this.carrelloService.aggiungiAlCarrello(
          videogiocoId,
          quantita,
          titolo,
          prezzo
        );
        alert(`Videogioco aggiunto al carrello: ${titolo} - Prezzo: ${prezzo}`);
      });
  }

  filterVideogiochi(): void {
    this.filteredVideogiochi = this.videogiochi.filter((videogioco) =>
      videogioco.titolo.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  apriTrailer(videogioco: any): void {
    this.modalAperto = videogioco.id;
    this.trailerUrl = this.getSafeTrailerUrl(videogioco.trailerUrl);
  }

  chiudiTrailer(): void {
    this.modalAperto = null;
    this.trailerUrl = null; // Libera memoria
  }

  getYouTubeVideoId(url: string): string {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : '';
  }
  trackByVideogioco(index: number, videogioco: any): number {
    return videogioco.id;
  }
}
