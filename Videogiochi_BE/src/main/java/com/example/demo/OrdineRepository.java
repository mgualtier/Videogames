package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Ordine;

import java.util.List;

public interface OrdineRepository extends JpaRepository<Ordine, Long> {

     List<Ordine> findByUtenteId(Long utenteId);
}