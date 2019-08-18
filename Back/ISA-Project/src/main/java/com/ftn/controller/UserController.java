package com.ftn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.model.Korisnik;
import com.ftn.service.UserService;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@RequestMapping(value = "/getRegularUsers", method = RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Korisnik>> getRegularUsers() {	
		List<Korisnik> regularUsers = userService.getAllRegularUsers();
		return new ResponseEntity<>(regularUsers, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getAdministrators", method = RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Korisnik>> getAdministrators() {	
		List<Korisnik> administrators = userService.getAllAdministrators();
		return new ResponseEntity<>(administrators, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/changeRole/{id}", method = RequestMethod.PUT)
	@CrossOrigin(origins = "http://localhost:4200")
	public void changeRole(@PathVariable Long id,@RequestBody String novaUloga) {	
		boolean uspesnaPromena = userService.changeRole(id, novaUloga);
		/*if (uspesnaPromena) {
			return new ResponseEntity<>("Uspesna promena", HttpStatus.OK);
		} else 
			return new ResponseEntity<>("Neuspesna promena", HttpStatus.OK);*/
	}
	
	@RequestMapping(value = "/getHotelAdministrators", method = RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Korisnik>> getHotelAdministrators() {	
		List<Korisnik> hotelAdministrators = userService.getAllHotelAdministrators();
		return new ResponseEntity<>(hotelAdministrators, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getRentCarAdministrators", method = RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Korisnik>> getRentCarAdministrators() {	
		List<Korisnik> rentCarAdministrators = userService.getAllRentCarAdministrators();
		return new ResponseEntity<>(rentCarAdministrators, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getAviokompanijaAdministrators", method = RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Korisnik>> getAviokompanijaAdministrators() {	
		List<Korisnik> aviokompanijaAdministrators = userService.getAllAviokompanijaAdministrators();
		return new ResponseEntity<>(aviokompanijaAdministrators, HttpStatus.OK);
	}
	
	

}
