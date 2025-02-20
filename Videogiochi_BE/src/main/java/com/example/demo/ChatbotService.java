package com.example.demo;

import com.example.demo.Ordine;
import com.example.demo.ProdottoOrdine;

import io.github.cdimascio.dotenv.Dotenv;

import com.example.demo.OrdineRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;
import java.util.Collections;

@Service
public class ChatbotService {
	private static final Dotenv dotenv = Dotenv.load();
    private static final String API_URL = dotenv.get("HUGGING_FACE_API_URL");
    private static final String API_TOKEN = dotenv.get("HUGGING_FACE_TOKEN");

    private static final String VIDEOGIOCHI_API_URL = "http://localhost:8080/api/videogiochi";
 
    private final OrdineRepository ordineRepository;

    public ChatbotService(OrdineRepository ordineRepository) {
        this.ordineRepository = ordineRepository;
    }

    /**
     * Metodo che invia un messaggio all'AI (Hugging Face) e restituisce la risposta generata.
     */
    public String chat(String message, Long userId) {

        if (message.toLowerCase().contains("ordini") ||
                message.toLowerCase().contains("miei ordini") ||
                message.toLowerCase().contains("acquisti")) {
            return getOrdiniByUtente(userId);
        }


        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> body = Collections.singletonMap("inputs", message);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", API_TOKEN);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<List<Map<String, String>>> response = restTemplate.exchange(
                    API_URL, HttpMethod.POST, request,
                    new ParameterizedTypeReference<List<Map<String, String>>>() {
                    }
            );
            List<Map<String, String>> responseBody = response.getBody();
            if (responseBody != null && !responseBody.isEmpty()) {
                return responseBody.get(0).get("generated_text");
            } else {
                return "Il chatbot non ha restituito alcuna risposta.";
            }
        } catch (Exception e) {
            return "Errore nel contattare il servizio chatbot: " + e.getMessage();
        }
    }

    /**
     * Metodo che recupera gli ordini dell'utente e restituisce una stringa con i dettagli,
     * inclusi i videogiochi contenuti in ogni ordine.
     */
    public String getOrdiniByUtente(Long userId) {
        // Recupera gli ordini usando il repository
        List<Ordine> ordini = ordineRepository.findByUtenteId(userId);
        if (ordini == null || ordini.isEmpty()) {
            return "Non hai effettuato alcun ordine.";
        }
        StringBuilder response = new StringBuilder("Ecco i tuoi ordini:\n");
        for (Ordine ordine : ordini) {
            response.append("Ordine ID: ").append(ordine.getId()).append(":\n");
            List<ProdottoOrdine> prodotti = ordine.getProdottiOrdine();
            if (prodotti != null && !prodotti.isEmpty()) {
                for (ProdottoOrdine prodotto : prodotti) {
                    Videogioco v = prodotto.getVideogioco(); 
                    if (v != null) {
                        response.append(" - ").append(v.getTitolo()).append("\n");
                    } else {
                        response.append("  Nessun videogioco associato a questo prodotto.\n");
                    }
                }
            } else {
                response.append("  Nessun prodotto in questo ordine.\n");
            }
        }
        return response.toString();
    }

}