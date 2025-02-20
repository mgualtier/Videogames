package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/videogiochi")
@CrossOrigin(origins = "http://localhost:4200")
public class VideogiocoController {

	private final VideogiochiService videogiochiService;
	private final CasaDiSviluppoService casaDiSviluppoService;
	private final PiattaformaService piattaformaService;
	private final categoriaService categoriaService;

	public VideogiocoController(VideogiochiService videogiochiService, CasaDiSviluppoService casa,
			PiattaformaService piatta, categoriaService cate) {
		this.videogiochiService = videogiochiService;
		this.casaDiSviluppoService = casa;
		this.piattaformaService = piatta;
		this.categoriaService = cate;
	}

	@GetMapping
	public List<Videogioco> findAll() {
		return videogiochiService.getAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Videogioco> findById(@PathVariable Long id) {
		Videogioco videogioco = videogiochiService.getById(id);
		if (videogioco == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(videogioco, HttpStatus.OK);
	}

	@PostMapping("/upload")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Videogioco> uploadVideogioco(@RequestBody Videogioco videogioco) {
	    
	    CasaDiSviluppo casaDiSviluppo = casaDiSviluppoService.getById(videogioco.getCasaDiSviluppo().getId());
	    Piattaforma piattaforma = piattaformaService.getById(videogioco.getPiattaforma().getId());
	    Set<Categoria> categorie = videogioco.getCategorie().stream()
	            .map(categoria -> categoriaService.getById(categoria.getId())).collect(Collectors.toSet());

	    videogioco.setCasaDiSviluppo(casaDiSviluppo);
	    videogioco.setPiattaforma(piattaforma);
	    videogioco.setCategorie(categorie);

	    Videogioco savedVideogioco = videogiochiService.saveVideogioco(videogioco);
	    return new ResponseEntity<>(savedVideogioco, HttpStatus.CREATED);
	}


	@PutMapping("/{id}")
	public ResponseEntity<Videogioco> update(@PathVariable Long id, @RequestBody Videogioco videogioco) {

		Videogioco existingVideogioco = videogiochiService.getById(id);
		if (existingVideogioco == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		CasaDiSviluppo casaDiSviluppo = casaDiSviluppoService.getById(videogioco.getCasaDiSviluppo().getId());
		if (casaDiSviluppo == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Piattaforma piattaforma = piattaformaService.getById(videogioco.getPiattaforma().getId());
		if (piattaforma == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Set<Categoria> categorie = videogioco.getCategorie().stream()
				.map(categoria -> categoriaService.getById(categoria.getId())).collect(Collectors.toSet());
		if (categorie.contains(null)) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		existingVideogioco.setTitolo(videogioco.getTitolo());
		existingVideogioco.setCasaDiSviluppo(casaDiSviluppo);
		existingVideogioco.setPiattaforma(piattaforma);
		existingVideogioco.setCategorie(categorie);
		existingVideogioco.setImmagineUrl(videogioco.getImmagineUrl());
		existingVideogioco.setTrailerUrl(videogioco.getTrailerUrl());
		existingVideogioco.setQuantitaDisponibile(videogioco.getQuantitaDisponibile());
		Videogioco updatedVideogioco = videogiochiService.saveVideogioco(existingVideogioco);

		return new ResponseEntity<>(updatedVideogioco, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVideoGame(@PathVariable Long id) {
		try {

			Videogioco existingVideogioco = videogiochiService.getById(id);
			if (existingVideogioco == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}

			videogiochiService.deleteVideogioco(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {

			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}