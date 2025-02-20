package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CasaDiSviluppoService {

	@Autowired
	private casaDiSviluppoRepository casaDiSviluppoRepository;

	public List<CasaDiSviluppo> getAll() {
		return casaDiSviluppoRepository.findAll();
	}

	public CasaDiSviluppo getById(Long id) {
		return casaDiSviluppoRepository.findById(id).orElse(null);
	}

	public CasaDiSviluppo saveCasaDiSviluppo(CasaDiSviluppo casa) {
		return casaDiSviluppoRepository.saveAndFlush(casa);
	}

	public void deleteCasaDiSviluppo(Long id) {
		casaDiSviluppoRepository.deleteById(id);
	}

}
