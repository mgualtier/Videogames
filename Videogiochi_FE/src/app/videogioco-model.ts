export interface VideogiocoModel {
  id: number;
  titolo: string;
  immagine?: string;
  piattaforma: { nome: string };
  casaDiSviluppo: { nome: string };
  trailer?: string;
  showTrailer?: boolean;
}
