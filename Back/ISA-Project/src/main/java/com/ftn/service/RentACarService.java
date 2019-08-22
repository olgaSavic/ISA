package com.ftn.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dto.RentCarDTO;
import com.ftn.model.Korisnik;
import com.ftn.model.rentacar.RentACar;
import com.ftn.repository.RentCarRepository;
import com.ftn.repository.UserRepository;

@Service
public class RentACarService {
	
	@Autowired
	private RentCarRepository rentCarRepository;
	@Autowired
	private UserRepository userRepository;

	public RentACar registerRentCar(RentCarDTO rentCarDTO) {
		RentACar rentCar = new RentACar();
		rentCar.setNaziv(rentCarDTO.getName());
		rentCar.setAdresa(rentCarDTO.getAddress());
		
		//Provera da li vec postoji hotel sa istim nazivom i adresom
		ArrayList<RentACar> existingServices = (ArrayList<RentACar>) rentCarRepository.findAll();
		for(RentACar existingService: existingServices) {
			if(existingService.getNaziv().equals(rentCar.getNaziv()) && existingService.getAdresa().equals(rentCar.getAdresa())) {
				return null;
			}
		}
		
		rentCar.setOpis(rentCarDTO.getDescription());
		if(userRepository.findByKorisnickoIme(rentCarDTO.getAdministratorRentCar()) != null) {
			Korisnik administratorRentACar = userRepository.findByKorisnickoIme(rentCarDTO.getAdministratorRentCar());
			rentCar.setAdministrator(administratorRentACar);
		} else {
			return null;
		}
		rentCarRepository.save(rentCar);
		return rentCar;
	}


}
