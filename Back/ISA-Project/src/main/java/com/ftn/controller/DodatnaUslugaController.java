package com.ftn.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.model.hotels.DodatnaUsluga;
import com.ftn.service.DodatnaUslugaService;

@RestController
@RequestMapping(value = "/api/additionalService")
public class DodatnaUslugaController {
	
	@Autowired
	private DodatnaUslugaService dodatnaUslugaService;
	
	@GetMapping("/getAllAdditionalServices/{idHotela}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<ArrayList<DodatnaUsluga>> getAllAdditionalServices(@PathVariable Long idHotela) {
		ArrayList<DodatnaUsluga> dodatneUsluge = dodatnaUslugaService.getAllAdditionalServices(idHotela);
		return new ResponseEntity<ArrayList<DodatnaUsluga>>(dodatneUsluge, HttpStatus.OK);
	}
}
