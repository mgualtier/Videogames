package com.example.demo;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String secretKey;

    public PaymentController() {
        com.stripe.Stripe.apiKey = secretKey; 
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> data) {
        try {
            int amount = (int) data.get("amount"); 

     
            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", "eur"); 
            params.put("automatic_payment_methods", Map.of("enabled", true));

            PaymentIntent paymentIntent = PaymentIntent.create(params);

 
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());

            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

