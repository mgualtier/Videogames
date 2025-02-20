package com.example.demo;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.*;

@Entity
public class Ordine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "utente_id")
    private User utente;

    @Column(columnDefinition = "TEXT")
    private String domandaAssistenza;

    @Column(columnDefinition = "TEXT")
    private String emailAssistenza;
    
    private LocalDateTime dataCreazione;
    private double prezzoTotale;

    @OneToMany(mappedBy = "ordine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProdottoOrdine> prodottiOrdine;

    public Ordine(Long id, User utente, LocalDateTime dataCreazione, double prezzoTotale, List<ProdottoOrdine> prodottiOrdine) {
        this.id = id;
        this.utente = utente;
        this.dataCreazione = dataCreazione;
        this.prezzoTotale = prezzoTotale;
        this.prodottiOrdine = prodottiOrdine;
    }
    public Ordine() {}
    
    

    public String getEmailAssistenza() {
		return emailAssistenza;
	}
	public void setEmailAssistenza(String emailAssistenza) {
		this.emailAssistenza = emailAssistenza;
	}
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUtente() {
        return utente;
    }

    public void setUtente(User utente) {
        this.utente = utente;
    }

    public LocalDateTime getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(LocalDateTime dataCreazione) {
        this.dataCreazione = dataCreazione;
    }

    public double getPrezzoTotale() {
        return prezzoTotale;
    }

    public String getDomandaAssistenza() {
        return domandaAssistenza;
    }

    public void setDomandaAssistenza(String domandaAssistenza) {
        this.domandaAssistenza = domandaAssistenza;
    }

    public void setPrezzoTotale(double prezzoTotale) {
        this.prezzoTotale = prezzoTotale;
    }

    public List<ProdottoOrdine> getProdottiOrdine() {
        return prodottiOrdine;
    }

    public void setProdottiOrdine(List<ProdottoOrdine> prodottiOrdine) {
        this.prodottiOrdine = prodottiOrdine;
    }
    @Override
    public String toString() {
        return "Ordine{" +
               "id=" + id +
               ", utente=" + utente +
               ", prodottiOrdine=" + prodottiOrdine +
               ", dataCreazione=" + dataCreazione +
               ", prezzoTotale=" + prezzoTotale +
               '}';
    }

}