package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.stripe.Stripe;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
	    Dotenv dotenv = Dotenv.configure().load();
	    dotenv.entries().forEach(e -> {
	        System.setProperty(e.getKey(), e.getValue());
	    });

	    SpringApplication.run(DemoApplication.class, args);
	    System.out.println("Application started successfully");
	}


}
