import { Injectable } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeElements,
  PaymentIntentResult,
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private clientSecret: string | null = null;
  constructor(private http: HttpClient) {
    this.initStripe();
  }

  async initStripe() {
    this.stripe = await loadStripe(
      'pk_test_51QsLXHJqVx4MPSoSuAS8EJNOqRAvIiPr2yswaPCSN2jbYrXHuVZV2IZfM8p7zEeIaO4YPSjNNtGBgHxIvVYoUh8P00jT3mdVDP'
    );

    this.http
      .post<{ clientSecret: string }>('/create-payment-intent', {})
      .subscribe(
        async (response) => {
          this.clientSecret = response.clientSecret;
          this.elements =
            this.stripe?.elements({ clientSecret: this.clientSecret }) || null;
        },
        (error) => {
          console.error('Error fetching clientSecret:', error);
        }
      );
  }
  getClientSecret(): string | null {
    return this.clientSecret;
  }

  getElements(): StripeElements | null {
    return this.elements;
  }
  createOrder(paymentIntentId: string) {
    console.log('Order created with PaymentIntent ID:', paymentIntentId);
  }

  async confirmPayment(name: string, email: string, address: string) {
    if (!this.stripe || !this.elements) {
      throw new Error('Stripe is not properly initialized.');
    }

    const result = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name,
            email,
            address: {
              line1: address,
            },
          },
        },
      },
      redirect: 'if_required',
    });

    if (result.error) {
      console.error('Payment error:', result.error);
      alert(result.error.message);
    } else if (result.paymentIntent?.status === 'succeeded') {
      console.log('Payment successful!');
      this.createOrder(result.paymentIntent.id);
    }
  }
}
