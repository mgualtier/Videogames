package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/piattaforme")
@CrossOrigin("http://localhost:4200")
public class PiattaformaController {

    private final PiattaformaService piattaformaService;

    public PiattaformaController(PiattaformaService piattaformaService) {
        this.piattaformaService = piattaformaService;
    }

    @GetMapping
    public List<Piattaforma> findAll() {
        return piattaformaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Piattaforma> findById(@PathVariable Long id) {
        Piattaforma piattaforma = piattaformaService.getById(id);
        if (piattaforma == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(piattaforma, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Piattaforma> create(@RequestBody Piattaforma piattaforma) {
        Piattaforma savedPiattaforma = piattaformaService.savePiattaforma(piattaforma);
        return new ResponseEntity<>(savedPiattaforma, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Piattaforma> update(@PathVariable Long id, @RequestBody Piattaforma piattaforma) {
        Piattaforma existingPiattaforma = piattaformaService.getById(id);
        if (existingPiattaforma == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        existingPiattaforma.setNome(piattaforma.getNome());
        existingPiattaforma.setProduttore(piattaforma.getProduttore());

        Piattaforma updatedPiattaforma = piattaformaService.savePiattaforma(existingPiattaforma);
        return new ResponseEntity<>(updatedPiattaforma, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePiattaforma(@PathVariable Long id) {
        try {
            Piattaforma existingPiattaforma = piattaformaService.getById(id);
            if (existingPiattaforma == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            piattaformaService.deletePiattaforma(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
