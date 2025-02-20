package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class categoriaService {
	@Autowired
	private categoriaRepository categoriaRepository;

	public List<Categoria> getAll() {
		return categoriaRepository.findAll();
	}

	public Categoria getById(Long id) {
		return categoriaRepository.findById(id).orElse(null);
	}

	public Categoria saveCategoria(Categoria cate) {
		return categoriaRepository.saveAndFlush(cate);
	}



	public void deleteCategoria(Long id) {
		categoriaRepository.deleteById(id);
	}

}
