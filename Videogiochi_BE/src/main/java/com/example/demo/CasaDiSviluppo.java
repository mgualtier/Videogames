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
public class CasaDiSviluppo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String sede;
	@OneToMany(mappedBy = "casaDiSviluppo", cascade = CascadeType.PERSIST)
	@JsonIgnore
	private Set<Videogioco> videogioco;
	
	public CasaDiSviluppo() {
		super();
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

	public String getSede() {
		return sede;
	}

	public void setSede(String sede) {
		this.sede = sede;
	}

	public CasaDiSviluppo(String nome, String sede) {
		super();
		this.nome = nome;
		this.sede = sede;
	}

	@Override
	public String toString() {
		return "CasaDiSviluppo [nome=" + nome + ", sede=" + sede + "]";
	}

}