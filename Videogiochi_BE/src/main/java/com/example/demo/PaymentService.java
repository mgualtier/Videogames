package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
public class PaymentService {
	  public PaymentService(@Value("${stripe.secret.key}") String secretKey) {
	        Stripe.apiKey = secretKey; 
	    }

	    public String createCustomer(User user) {
	        try {
	            CustomerCreateParams params = CustomerCreateParams.builder()
	                    .setEmail(user.getEmail())
	                    .setName(user.getUsername())
	                    .build();

	            Customer customer = Customer.create(params);
	            return customer.getId();
	        } catch (Exception e) {
	            throw new RuntimeException("Errore nella creazione del cliente Stripe", e);
	        }
	    }

	    public String createPaymentIntent(String customerId, int amount) {
	        try {
	            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
	                    .setAmount((long) amount)
	                    .setCurrency("eur")
	                    .setCustomer(customerId)
	                    .setAutomaticPaymentMethods(
	                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
	                            .setEnabled(true)
	                            .build()
	                    )
	                    .build();

	            PaymentIntent paymentIntent = PaymentIntent.create(params);
	            return paymentIntent.getClientSecret();  
	        } catch (Exception e) {
	            throw new RuntimeException("Errore nella creazione del PaymentIntent", e);
	        }
	    }

}
