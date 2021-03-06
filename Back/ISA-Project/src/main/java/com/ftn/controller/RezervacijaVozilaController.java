package com.ftn.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dto.RezervacijaVozilaDTO;
import com.ftn.model.rentacar.RentACar;
import com.ftn.model.rentacar.RezervacijaVozila;
import com.ftn.repository.RezervacijaVozilaRepository;
import com.ftn.service.RezervacijaVozilaService;
import com.ftn.service.UserService;

@RestController
@RequestMapping(value = "voziloReservation")
public class RezervacijaVozilaController 
{
	@Autowired
	private RezervacijaVozilaService rezVozService ;
	
	@Autowired
	private RezervacijaVozilaRepository rezVozRepository ;
	
	@Autowired 
	private UserService userService ;
	
	// ZA TESTIRANJE
	@PostMapping("/voziloReservation/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<RezervacijaVozila> voziloReservation(@RequestBody RezervacijaVozilaDTO rezervacijaDTO, @PathVariable Long id) throws Exception 
	{
		RezervacijaVozila rezervacija = rezVozService.createReservationRent(rezervacijaDTO, id);
		return new ResponseEntity<RezervacijaVozila>(rezervacija, HttpStatus.CREATED);
	}
	
	// ZA TESTIRANJE PART 2
		@PostMapping("/voziloReservationNewTest/{id}")
		@CrossOrigin(origins = "http://localhost:4200")
		public ResponseEntity<RezervacijaVozila> voziloReservationNewTest(@RequestBody RezervacijaVozilaDTO rezervacijaDTO, @PathVariable Long id) throws Exception 
		{
			RezervacijaVozila rezervacija = rezVozService.createReservationRentTest(rezervacijaDTO, id);
			return new ResponseEntity<RezervacijaVozila>(rezervacija, HttpStatus.CREATED);
		}
	
	// PRAVA REZERVACIJA
	@PostMapping("/rezervisiVozilo")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<RezervacijaVozila> rezervisiVozilo(@RequestBody RezervacijaVozilaDTO rezervacijaDTO) throws Exception 
	{
		RezervacijaVozila rezervacija = rezVozService.createReservationRent(rezervacijaDTO, userService.getCurrentUser().getId());
		return new ResponseEntity<RezervacijaVozila>(rezervacija, HttpStatus.CREATED);
	}
	
	// PRAVA REZERVACIJA NOVA
		@PostMapping("/createReservationRentNova")
		@CrossOrigin(origins = "http://localhost:4200")
		public ResponseEntity<RezervacijaVozila> createReservationRentNova(@RequestBody RezervacijaVozilaDTO rezervacijaDTO) throws Exception 
		{
			String povratnaVrednost = rezVozService.createReservationRentNova(rezervacijaDTO, userService.getCurrentUser().getId());
			
			
			if (povratnaVrednost.equals("greska"))
			{
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
			if (povratnaVrednost.equals("ok"))
			{	
				return new ResponseEntity<>(HttpStatus.CREATED);
			}
			else
			{
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}
	
	
	// otkazivanje rezervacije vozila

	@PostMapping("/otkaziRezervacijuVozila/{idRezervacije}")
	@CrossOrigin(origins = "http://localhost:4200")
	public boolean otkaziRezervacijuVozila(@PathVariable Long idRezervacije) 
	{
		RezervacijaVozila rezervacija = rezVozRepository.getOne(idRezervacije);
		LocalDate date = LocalDate.now().plusDays(3);

		if (date.isBefore(rezervacija.getDatumPreuzimanja()) || date.equals(rezervacija.getDatumPreuzimanja())) 
		{
			System.out.println("Uspesno otkazana rezervacija");
			rezVozRepository.deleteById(idRezervacije);
			return true;
		}

		else {
			System.out.println("Nije moguce otkazati rezervaciju!");
			return false;

		}
	}
	
	// vraca listu rezervacija korisnika
	@GetMapping("/listaRentRezervacijaKorisnik")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<RezervacijaVozila>> listaRentRezervacijaKorisnik()
	{
		ArrayList<RezervacijaVozila> reservations = rezVozService.listaRezervacijaKorisnik(userService.getCurrentUser().getId());
		return new ResponseEntity<List<RezervacijaVozila>>(reservations, HttpStatus.OK);
		
	}
	
	@PostMapping("/createFastResRent/{idRezervacijeLeta}/{idRent}/{idVozila}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<RezervacijaVozila> createFastResRent(@PathVariable Long idRezervacijeLeta, @PathVariable Long idRent, @PathVariable Long idVozila) throws Exception 
	{
		Long id = userService.getCurrentUser().getId();
		RezervacijaVozila rezervacija = rezVozService.createOrChangeFastVoziloReservation(id, idRezervacijeLeta, idRent, idVozila);
		return new ResponseEntity<RezervacijaVozila>(rezervacija, HttpStatus.CREATED);
	}
}
