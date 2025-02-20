package com.example.demo;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Piattaforma {
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String produttore;
	@OneToMany(mappedBy = "piattaforma", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private Set<Videogioco> videogioco;
	public Piattaforma() {
		super();
	}

	public Piattaforma(String nome, String produttore) {
		super();
		this.nome = nome;
		this.produttore = produttore;
	}

	
	
	public Set<Videogioco> getVideogioco() {
		return videogioco;
	}

	public void setVideogioco(Set<Videogioco> videogioco) {
		this.videogioco = videogioco;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getProduttore() {
		return produttore;
	}

	public void setProduttore(String produttore) {
		this.produttore = produttore;
	}

	@Override
	public String toString() {
		return "Piattaforma [nome=" + nome + ", produttore=" + produttore + "]";
	}

}
