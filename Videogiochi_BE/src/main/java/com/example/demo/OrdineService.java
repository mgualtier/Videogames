package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrdineService {
	   private static final Logger logger = LoggerFactory.getLogger(OrdineService.class);
	@Autowired
	private OrdineRepository ordineRepository;

	@Autowired
	private VideogiocoRepository videogiocoRepository;

	@Autowired
	private UserRepository userRepository;

	public Ordine creaOrdine(Ordine ordineInput) {
        logger.info("Creazione ordine per utente id: {}", ordineInput.getUtente().getId());

        // Verifica esistenza utente
        User utente = userRepository.findById(ordineInput.getUtente().getId())
                .orElseThrow(() -> {
                    logger.error("Utente non trovato per id: {}", ordineInput.getUtente().getId());
                    return new EntityNotFoundException("Utente non trovato!");
                });
        logger.info("Utente trovato: {}", utente);

        ordineInput.setUtente(utente);
        ordineInput.setDataCreazione(LocalDateTime.now());

        List<ProdottoOrdine> prodottiOrdine = new ArrayList<>();

        for (ProdottoOrdine prodottoOrdineInput : ordineInput.getProdottiOrdine()) {
            Long videogiocoId = prodottoOrdineInput.getVideogioco().getId();
            logger.info("Elaborazione ProdottoOrdine per videogioco id: {}", videogiocoId);

            Videogioco videogioco = videogiocoRepository.findById(videogiocoId)
                    .orElseThrow(() -> {
                        logger.error("Videogioco non trovato per id: {}", videogiocoId);
                        return new EntityNotFoundException("Videogioco non trovato!");
                    });
            logger.info("Videogioco trovato: {} - Quantità disponibile: {}", videogioco.getTitolo(), videogioco.getQuantitaDisponibile());

            // Verifica quantità disponibile
            if (videogioco.getQuantitaDisponibile() < prodottoOrdineInput.getQuantita()) {
                String errorMsg = "Quantità non disponibile per il videogioco: " + videogioco.getTitolo();
                logger.error(errorMsg + ". Richiesto: {}, Disponibile: {}", 
                        prodottoOrdineInput.getQuantita(), videogioco.getQuantitaDisponibile());
                throw new IllegalArgumentException(errorMsg);
            }

            prodottoOrdineInput.setOrdine(ordineInput);
            prodottoOrdineInput.setVideogioco(videogioco);
            prodottoOrdineInput.setPrezzoUnitario(videogioco.getPrezzo());
            double prezzoTotaleProdotto = prodottoOrdineInput.getQuantita() * videogioco.getPrezzo();
            prodottoOrdineInput.setPrezzoTotale(prezzoTotaleProdotto);
            logger.info("ProdottoOrdine elaborato: quantità: {}, prezzo unitario: {}, prezzo totale: {}",
                    prodottoOrdineInput.getQuantita(), videogioco.getPrezzo(), prezzoTotaleProdotto);

            prodottiOrdine.add(prodottoOrdineInput);

            // Aggiorna la quantità disponibile del videogioco
            videogioco.setQuantitaDisponibile(videogioco.getQuantitaDisponibile() - prodottoOrdineInput.getQuantita());
            videogiocoRepository.save(videogioco);
            logger.info("Videogioco {} aggiornato: nuova quantità disponibile: {}", videogioco.getTitolo(), videogioco.getQuantitaDisponibile());
        }

        ordineInput.setProdottiOrdine(prodottiOrdine);

        // Calcola il prezzo totale
        double prezzoTotale = prodottiOrdine.stream().mapToDouble(ProdottoOrdine::getPrezzoTotale).sum();
        ordineInput.setPrezzoTotale(prezzoTotale);
        logger.info("Prezzo totale calcolato: {}", prezzoTotale);

        // Salva l'ordine
        Ordine ordineSalvato = ordineRepository.save(ordineInput);
        logger.info("Ordine salvato con id: {}", ordineSalvato.getId());

        return ordineSalvato;
    }

	public List<Ordine> getAll() {
		return ordineRepository.findAll();
	}

	public Ordine getById(Long id) {
		return ordineRepository.findById(id).orElse(null);
	}

	public void deleteOrdine(Ordine ordine) {

		ordineRepository.delete(ordine);
	}

	public void salvaOrdine(Ordine ordine) {
		ordineRepository.save(ordine);
	}
	public List<Ordine> getByUtente(Long idUtente) {
		return ordineRepository.findByUtenteId(idUtente);
	}

}
