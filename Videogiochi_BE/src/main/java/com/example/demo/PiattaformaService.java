package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PiattaformaService {

	@Autowired
	private piattaformaRepository piattaformaRepository;

	public List<Piattaforma> getAll() {
		return piattaformaRepository.findAll();
	}

	public Piattaforma getById(Long id) {
		return piattaformaRepository.findById(id).orElse(null);
	}

	public Piattaforma savePiattaforma(Piattaforma piattaforma) {
		return piattaformaRepository.saveAndFlush(piattaforma);
	}

	public void deletePiattaforma(Long id) {
		piattaformaRepository.deleteById(id);
	}

}
