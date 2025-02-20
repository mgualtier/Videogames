package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/casadisviluppo")
@CrossOrigin("http://localhost:4200")
public class CasaDiSviluppoController {

    private final CasaDiSviluppoService casaDiSviluppoService;

    public CasaDiSviluppoController(CasaDiSviluppoService casaDiSviluppoService) {
        this.casaDiSviluppoService = casaDiSviluppoService;
    }

    @GetMapping
    public List<CasaDiSviluppo> findAll() {
        return casaDiSviluppoService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CasaDiSviluppo> findById(@PathVariable Long id) {
        CasaDiSviluppo casaDiSviluppo = casaDiSviluppoService.getById(id);
        if (casaDiSviluppo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(casaDiSviluppo, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CasaDiSviluppo> create(@RequestBody CasaDiSviluppo casaDiSviluppo) {
    
        CasaDiSviluppo savedCasaDiSviluppo = casaDiSviluppoService.saveCasaDiSviluppo(casaDiSviluppo);
        return new ResponseEntity<>(savedCasaDiSviluppo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CasaDiSviluppo> update(@PathVariable Long id, @RequestBody CasaDiSviluppo casaDiSviluppo) {
        CasaDiSviluppo existingCasaDiSviluppo = casaDiSviluppoService.getById(id);
        if (existingCasaDiSviluppo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

     
        existingCasaDiSviluppo.setNome(casaDiSviluppo.getNome());
        existingCasaDiSviluppo.setSede(casaDiSviluppo.getSede());

        CasaDiSviluppo updatedCasaDiSviluppo = casaDiSviluppoService.saveCasaDiSviluppo(existingCasaDiSviluppo);
        return new ResponseEntity<>(updatedCasaDiSviluppo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCasaDiSviluppo(@PathVariable Long id) {
        try {
            CasaDiSviluppo existingCasaDiSviluppo = casaDiSviluppoService.getById(id);
            if (existingCasaDiSviluppo == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            casaDiSviluppoService.deleteCasaDiSviluppo(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
