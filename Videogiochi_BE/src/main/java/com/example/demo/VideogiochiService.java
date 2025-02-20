package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class VideogiochiService {
	@Autowired
	private VideogiocoRepository videogiochiRepository;

	public List<Videogioco> getAll() {
		return videogiochiRepository.findAll();
	}

	public Videogioco getById(Long id) {
		return videogiochiRepository.findById(id).orElse(null);
	}

	public Videogioco saveVideogioco(Videogioco videogioco) {
		return videogiochiRepository.saveAndFlush(videogioco);
	}

	public void deleteVideogioco(Long id) {
		videogiochiRepository.deleteById(id);
	}
}