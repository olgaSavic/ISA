package com.ftn.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dto.HotelDTO;
import com.ftn.dto.PretragaHotelaDTO;
import com.ftn.dto.VremenskiPeriodDTO;
import com.ftn.model.hotels.Hotel;
import com.ftn.model.hotels.Soba;
import com.ftn.service.HotelService;


@RestController
@RequestMapping(value = "/api/hotel")
public class HotelController {
	
	@Autowired
	private HotelService hotelService;
	
	
	/************ Borkovac **********/
	
	@PostMapping("/registerHotel")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Hotel> registerHotel(@RequestBody HotelDTO hotelDTO) {
		Hotel hotel = hotelService.registerHotel(hotelDTO);
		return new ResponseEntity<Hotel>(hotel, HttpStatus.OK);
	}
	
	@GetMapping("/getHotelsByAdministrator/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Hotel>> getHotelsByAdministrator(@PathVariable Long id) {
		ArrayList<Hotel> hotels = hotelService.getHotelsByAdministrator(id);
		return new ResponseEntity<List<Hotel>>(hotels, HttpStatus.OK);
	}
	
	@PutMapping("/izmeniHotel/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Hotel> editHotel( @PathVariable Long id, @RequestBody HotelDTO hotelDTO) {
		Hotel hotel = hotelService.editHotel(id, hotelDTO);
		return new ResponseEntity<Hotel>(hotel, HttpStatus.OK);
	}
	
	@GetMapping("/checkIfReservedHotel/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public boolean checkIfReservedHotel(@PathVariable Long id) {
		//Ako hotel ne poseduje rezervisane sobe, taken je FALSE
		//u suprotnom taken ima vrednost TRUE
		boolean taken = hotelService.checkIfHotelIsReserved(id);
		return taken;
	}
	
	@GetMapping("/getHotel/{idHotela}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Hotel> getHotel(@PathVariable Long idHotela) {
		Hotel hotel = hotelService.getHotel(idHotela);
		if (hotel == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(hotel, HttpStatus.OK);
	}
	
	@GetMapping("/getAllHotels")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Hotel>> getAllHotels() {
		ArrayList<Hotel> hotels = hotelService.getAllHotels();
		return new ResponseEntity<List<Hotel>>(hotels, HttpStatus.OK);
	}
	
	@PostMapping("/searchHotels")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<ArrayList<Hotel>> searchHotels(@RequestBody PretragaHotelaDTO phDTO) {
		ArrayList<Hotel> hoteli = hotelService.searchHotels(phDTO);
		return new ResponseEntity<ArrayList<Hotel>>(hoteli, HttpStatus.OK);
	}
	
	@GetMapping("/monthlyGraph/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getMonthyGraphData(@PathVariable Long id, @RequestParam String year) {
		ArrayList<Integer> monthsData = hotelService.getMonthyGraphData(id, year);
		return new ResponseEntity<List<Integer>>(monthsData, HttpStatus.OK);
	}
	
	@GetMapping("/weeklyGraph/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getWeeklyGraphData(@PathVariable Long id, @RequestParam String year, @RequestParam String month) {
		ArrayList<Integer> weeksData = hotelService.getWeeklyGraphData(id, year, month);
		return new ResponseEntity<List<Integer>>(weeksData, HttpStatus.OK);
	}
	
	@GetMapping("/dailyGraph/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getDailyGraphData(@PathVariable Long id, @RequestParam String date) {
		ArrayList<Integer> daysData = hotelService.getDailyGraphData(id, date);
		return new ResponseEntity<List<Integer>>(daysData, HttpStatus.OK);
	}
	
	/**********************/
	/******* Olga *********/
	
	// vraca sve hotele
	@GetMapping("/vratiSveHotele")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Hotel>> vratiSveHotele() throws Exception 
	{
		ArrayList<Hotel> hoteli = hotelService.getSviHoteli();
		return new ResponseEntity<List<Hotel>>(hoteli, HttpStatus.OK);
	}
	
	// 2.7
		@GetMapping("/vratiHoteleKorisnika/{id}")
		@CrossOrigin(origins = "http://localhost:4200")
		public ResponseEntity<List<Hotel>> vratiHoteleKorisnika(@PathVariable Long id) throws Exception 
		{
			ArrayList<Hotel> hoteli = hotelService.getHoteliKorisnik(id);
			return new ResponseEntity<List<Hotel>>(hoteli, HttpStatus.OK);
		}
	/**********************/

	
	

}
