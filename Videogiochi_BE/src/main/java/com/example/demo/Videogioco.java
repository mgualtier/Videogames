package com.example.demo;

import java.util.List;
import java.util.Set;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Videogioco {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String titolo;
	@ManyToOne
	@JoinColumn(name = "piattaforma_id")
	private Piattaforma piattaforma;
	@ManyToOne
	@JoinColumn(name = "casa_di_sviluppo_id")
	private CasaDiSviluppo casaDiSviluppo;
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "categoria_videogiochi", joinColumns = @JoinColumn(name = "videogiochi_id"), inverseJoinColumns = @JoinColumn(name = "categoria_id")

	)
	private Set<Categoria> categorie;

    @Lob  
    @Column(columnDefinition = "TEXT") 
    private String immagineUrl;

    @Lob  
    @Column(columnDefinition = "TEXT")  
    private String trailerUrl;

	private double prezzo;
	private int quantitaDisponibile;

	public Videogioco() {
		super();
	}

	public Videogioco(Long id, String titolo, Piattaforma piattaforma, CasaDiSviluppo casaDiSviluppo,
			Set<Categoria> categorie, String immagineUrl, String trailerUrl, double prezzo, int quantitàDisponibile) {
		super();
		this.id = id;
		this.titolo = titolo;
		this.piattaforma = piattaforma;
		this.casaDiSviluppo = casaDiSviluppo;
		this.categorie = categorie;
		this.immagineUrl = immagineUrl;
		this.trailerUrl = trailerUrl;
		this.prezzo = prezzo;
		this.quantitaDisponibile = quantitàDisponibile;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitolo() {
		return titolo;
	}

	public void setTitolo(String titolo) {
		this.titolo = titolo;
	}

	public Piattaforma getPiattaforma() {
		return piattaforma;
	}

	public void setPiattaforma(Piattaforma piattaforma) {
		this.piattaforma = piattaforma;
	}

	public CasaDiSviluppo getCasaDiSviluppo() {
		return casaDiSviluppo;
	}

	public void setCasaDiSviluppo(CasaDiSviluppo casaDiSviluppo) {
		this.casaDiSviluppo = casaDiSviluppo;
	}

	public Set<Categoria> getCategorie() {
		return categorie;
	}

	public void setCategorie(Set<Categoria> categorie) {
		this.categorie = categorie;
	}

	public String getImmagineUrl() {
		return immagineUrl;
	}

	public void setImmagineUrl(String immagineUrl) {
		this.immagineUrl = immagineUrl;
	}

	public String getTrailerUrl() {
		return trailerUrl;
	}

	public void setTrailerUrl(String trailerUrl) {
		this.trailerUrl = trailerUrl;
	}

	public double getPrezzo() {
		return prezzo;
	}

	public void setPrezzo(double prezzo) {
		this.prezzo = prezzo;
	}

	public int getQuantitaDisponibile() {
		return quantitaDisponibile;
	}

	public void setQuantitaDisponibile(int quantitàDisponibile) {
		this.quantitaDisponibile = quantitàDisponibile;
	}

}