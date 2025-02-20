package com.example.demo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class ProdottoOrdine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ordine_id")
    @JsonBackReference
    private Ordine ordine;


    private int quantita;
    private double prezzoUnitario;
    private double prezzoTotale;    

    @ManyToOne
    @JoinColumn(name = "videogioco_id")
    private Videogioco videogioco;


    public ProdottoOrdine(){}

    public ProdottoOrdine(Long id, Ordine ordine, int quantita, double prezzoUnitario, double prezzoTotale, Videogioco videogioco) {
        this.id = id;
        this.ordine = ordine;
        this.quantita = quantita;
        this.prezzoUnitario = prezzoUnitario;
        this.prezzoTotale = prezzoTotale;
        this.videogioco = videogioco;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ordine getOrdine() {
        return ordine;
    }

    public void setOrdine(Ordine ordine) {
        this.ordine = ordine;
    }

    public int getQuantita() {
        return quantita;
    }

    public void setQuantita(int quantita) {
        this.quantita = quantita;
    }

    public double getPrezzoUnitario() {
        return prezzoUnitario;
    }

    public void setPrezzoUnitario(double prezzoUnitario) {
        this.prezzoUnitario = prezzoUnitario;
    }

    public double getPrezzoTotale() {
        return prezzoTotale;
    }

    public void setPrezzoTotale(double prezzoTotale) {
        this.prezzoTotale = prezzoTotale;
    }

    public Videogioco getVideogioco() {
        return videogioco;
    }

    public void setVideogioco(Videogioco videogioco) {
        this.videogioco = videogioco;
    }
}
