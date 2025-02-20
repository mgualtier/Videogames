package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import io.github.cdimascio.dotenv.Dotenv;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/ordini")
@CrossOrigin(origins = "http://localhost:4200")
public class OrdineController {

	@Autowired
	private OrdineService ordineService;
	private static final Dotenv dotenv = Dotenv.load();
	private final String RESEND_API_URL = "https://api.resend.com/emails";
	private final String RESEND_API_KEY = dotenv.get("RESEND_API_KEY");

	@PostMapping
	public ResponseEntity<Ordine> creaOrdine(@RequestBody Ordine ordine) {
		try {
			 System.out.println("Ricevuto ordine: " + ordine.toString());
			Ordine nuovoOrdine = ordineService.creaOrdine(ordine);
			return new ResponseEntity<>(nuovoOrdine, HttpStatus.CREATED);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Ordine> getOrdine(@PathVariable Long id) {
		try {
			Ordine ordine = ordineService.getById(id);
			if (ordine != null) {
				return new ResponseEntity<>(ordine, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/utente/{idUtente}")
	public ResponseEntity<List<Ordine>> getOrdiniByUtente(@PathVariable Long idUtente) {
		try {
			List<Ordine> ordini = ordineService.getByUtente(idUtente);
			return new ResponseEntity<>(ordini, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping
	public ResponseEntity<List<Ordine>> getAllOrdini() {
		try {
			List<Ordine> ordini = ordineService.getAll();
			return new ResponseEntity<>(ordini, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOrdine(@PathVariable Long id) {
		try {
			Ordine ordine = ordineService.getById(id);
			if (ordine == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			ordineService.deleteOrdine(ordine);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}/assistenza")
	public ResponseEntity<String> aggiungiDomandaAssistenza(@PathVariable Long id,
			@RequestBody Map<String, String> request) {
		try {
			Ordine ordine = ordineService.getById(id);
			if (ordine == null) {
				return new ResponseEntity<>("Ordine non trovato", HttpStatus.NOT_FOUND);
			}

			String domanda = request.get("domanda");
			String email = request.get("email");

			if (domanda == null || domanda.trim().isEmpty()) {
				return new ResponseEntity<>("La domanda di assistenza non può essere vuota", HttpStatus.BAD_REQUEST);
			}

			if (email == null || email.trim().isEmpty()) {
				return new ResponseEntity<>("L'email non può essere vuota", HttpStatus.BAD_REQUEST);
			}

			if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
				return new ResponseEntity<>("Formato email non valido", HttpStatus.BAD_REQUEST);
			}

			ordine.setEmailAssistenza(email);
			ordine.setDomandaAssistenza(domanda);
			ordineService.salvaOrdine(ordine);

			try {
				sendEmailWithResend(email, "Richiesta di Assistenza Ricevuta",
						"<p>Grazie per la tua richiesta. Ti contatteremo a breve.</p>");
			} catch (HttpClientErrorException e) {
				return ResponseEntity.status(e.getStatusCode())
						.body("Errore nell'invio dell'email: " + e.getResponseBodyAsString());
			}

			return new ResponseEntity<>("Domanda di assistenza salvata con successo", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Errore interno nel server", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private void sendEmailWithResend(String to, String subject, String body) {
		RestTemplate restTemplate = new RestTemplate();

		Map<String, Object> requestBody = new HashMap<>();
		requestBody.put("from", "onboarding@resend.dev");
		requestBody.put("to", to);
		requestBody.put("subject", subject);
		requestBody.put("html", body);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setBearerAuth(RESEND_API_KEY);

		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

		restTemplate.exchange(RESEND_API_URL, HttpMethod.POST, requestEntity, String.class);
	}
}
