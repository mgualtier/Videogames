package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .headers(headers -> headers
	            .contentSecurityPolicy(csp -> csp.policyDirectives(
	                "default-src 'self'; " +
	                "script-src 'self' 'nonce-randomNonce' https://js.stripe.com https://checkout.stripe.com " +
	                "https://b.stripecdn.com https://edge-js.stripe.com https://files.stripe.com; " +
	                "frame-src https://checkout.stripe.com; " +
	                "connect-src 'self' https://api.stripe.com https://checkout.stripe.com; " +
	                "img-src 'self' data: https://*.stripe.com https://b.stripecdn.com; " +
	                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
	                "font-src 'self' https://fonts.gstatic.com;"
	            ))
	        )
	        .csrf(csrf -> csrf.disable());

	    return http.build();
	}

}
