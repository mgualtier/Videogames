import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth-service.service';
import { CarrelloService } from '../../carrello.service';
import { Router } from '@angular/router';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentElementOptions, Appearance } from '@stripe/stripe-js';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  providers: [StripeService],
  imports: [
    ReactiveFormsModule,
    StripePaymentElementComponent,
    NgIf,
    RouterLink,
  ],
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent, { static: false })
  paymentElement!: StripePaymentElementComponent;

  checkoutForm: FormGroup;
  userId: number | null = null;
  videogiochiCarrello: any[] = [];
  clientSecret!: string;
  elements!: StripeElements;

  appearance: Appearance = {
    theme: 'night',
    variables: {
      colorPrimary: 'white',
      colorBackground: '#f4f4f4',
      colorText: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSizeBase: '16px',
    },
  };

  stripeElementsOptions: StripeElementsOptions = {
    locale: 'auto',
    appearance: this.appearance,
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false,
    },
  };

  checkoutData: any = {
    name: '',
    email: '',
    address: '',
    videogiochi: [],
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private carrelloService: CarrelloService,
    private router: Router,
    private stripeService: StripeService,
    private route: ActivatedRoute
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      if (
        params['payment_intent'] &&
        params['redirect_status'] === 'succeeded'
      ) {
        console.log(
          ' Pagamento confermato! Payment Intent:',
          params['payment_intent']
        );
        this.creaOrdine(params['payment_intent']);
      } else if (
        params['redirect_status'] &&
        params['redirect_status'] !== 'succeeded'
      ) {
        console.error(' Errore nel pagamento:', params['redirect_status']);
        alert('Errore durante il pagamento.');
      }
    });
    const user = this.authService.getUser();
    if (user && user.id) {
      this.userId = this.authService.getUserId();
      this.carrelloService.setUtenteId(this.userId);
      this.aggiornaCarrello();
    } else {
      console.error("Errore: impossibile ottenere l'ID utente.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntentId = urlParams.get('payment_intent');
    const redirectStatus = urlParams.get('redirect_status');

    if (paymentIntentId && redirectStatus === 'succeeded') {
      console.log(" L'utente è tornato da Stripe con un pagamento riuscito.");
      this.creaOrdine(paymentIntentId);
    }

    try {
      this.clientSecret = await this.fetchClientSecret();
      if (!this.clientSecret) {
        console.error('❌ Errore: clientSecret non ricevuto.');
        return;
      }

      this.stripeElementsOptions = {
        clientSecret: this.clientSecret,
        appearance: this.appearance,
        locale: 'auto',
      };

      this.stripeService
        .elements(this.stripeElementsOptions)
        .subscribe((elements) => {
          if (!elements) {
            console.error('Errore: impossibile creare Stripe Elements.');
            return;
          }
          this.elements = elements;

          setTimeout(() => {
            const paymentElement = elements.create('payment');
            paymentElement.mount('#payment-element');
          }, 0);
        });
    } catch (error) {
      console.error(" Errore durante l'inizializzazione di Stripe:", error);
    }
  }

  async fetchClientSecret(): Promise<string> {
    try {
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: this.calcolaPrezzoTotale() * 100 }),
      });
      const data = await response.json();
      return data.clientSecret || '';
    } catch (error) {
      console.error(' Error fetching clientSecret:', error);
      return '';
    }
  }

  calcolaPrezzoTotale(): number {
    return this.videogiochiCarrello.reduce(
      (acc, item) => acc + item.prezzo * item.quantita,
      0
    );
  }

  aggiornaCarrello(): void {
    const carrello = this.carrelloService.getCarrello();
    this.videogiochiCarrello = carrello.prodottiOrdine || [];
    this.checkoutData.videogiochi = this.videogiochiCarrello;
  }

  async onSubmit() {
    if (this.checkoutForm.invalid) {
      alert('Compila tutti i campi correttamente.');
      return;
    }

    if (!this.elements) {
      console.error(' Errore: Stripe Elements non è stato inizializzato.');
      alert('Errore di configurazione del pagamento.');
      return;
    }

    try {
      const result = await this.stripeService
        .confirmPayment({
          elements: this.elements,
          confirmParams: {
            return_url: window.location.origin + '/Esercizio/checkout',
          },
          redirect: 'if_required',
        })
        .toPromise();

      if (result?.paymentIntent?.status === 'succeeded') {
        console.log(
          ' Pagamento riuscito! Payment Intent ID:',
          result.paymentIntent.id
        );
        await this.creaOrdine(result.paymentIntent.id);
        alert('Pagamento riuscito!');
      } else {
        console.warn(' Pagamento non completato immediatamente.');
      }
    } catch (error) {
      console.error(' Errore durante la conferma del pagamento:', error);
      alert('Si è verificato un errore durante il pagamento.');
    }
  }

  creaOrdine(paymentIntentId: string): void {
    if (!this.userId) {
      console.error("Errore: impossibile generare l'ordine senza ID utente.");
      return;
    }

    const carrello = this.carrelloService.getCarrello();
    if (carrello.prodottiOrdine.length === 0) {
      alert('Il carrello è vuoto');
      return;
    }

    const ordine = {
      utente: { id: this.userId },
      prodottiOrdine: carrello.prodottiOrdine.map((item: any) => ({
        videogioco: { id: item.videogioco.id },
        quantita: item.quantita,
      })),
      pagamento: { stripePaymentIntentId: paymentIntentId },
    };
    console.log('ordine: ', ordine);
    this.carrelloService.inviaOrdine(ordine).subscribe({
      next: () => {
        alert('Ordine inviato con successo.');
        this.carrelloService.svuotaCarrello();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Errore durante l'invio dell'ordine:", err);
        alert("Errore durante l'invio dell'ordine. Riprova più tardi.");
      },
    });
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
