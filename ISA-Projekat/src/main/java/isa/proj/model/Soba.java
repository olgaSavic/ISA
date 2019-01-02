package isa.proj.model;

import java.util.ArrayList;

public class Soba {
	
	private String oznakaSobe;
	private Boolean rezervisana;
	private Double cenaNocenja;
	private ArrayList<Integer> oceneSobe;
	private Double prosecnaOcenaSobe;
	private Hotel hotel;

	public Soba () {
		
	}
	
	public Soba(String oznakaSobe, Boolean rezervisana, Double cenaNocenja, ArrayList<Integer> oceneSobe,
			Double prosecnaOcenaSobe, Hotel hotel) {
		super();
		this.oznakaSobe = oznakaSobe;
		this.rezervisana = rezervisana;
		this.cenaNocenja = cenaNocenja;
		this.oceneSobe = oceneSobe;
		this.prosecnaOcenaSobe = prosecnaOcenaSobe;
	}

	public String getOznakaSobe() {
		return oznakaSobe;
	}

	public void setOznakaSobe(String oznakaSobe) {
		this.oznakaSobe = oznakaSobe;
	}

	public Boolean getRezervisana() {
		return rezervisana;
	}

	public void setRezervisana(Boolean rezervisana) {
		this.rezervisana = rezervisana;
	}

	public Double getCenaNocenja() {
		return cenaNocenja;
	}

	public void setCenaNocenja(Double cenaNocenja) {
		this.cenaNocenja = cenaNocenja;
	}

	public ArrayList<Integer> getOceneSobe() {
		return oceneSobe;
	}

	public void setOceneSobe(ArrayList<Integer> oceneSobe) {
		this.oceneSobe = oceneSobe;
	}

	public Double getProsecnaOcenaSobe() {
		return prosecnaOcenaSobe;
	}

	public void setProsecnaOcenaSobe(Double prosecnaOcenaSobe) {
		this.prosecnaOcenaSobe = prosecnaOcenaSobe;
	}
	
	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}
	
	
	
	
	
	

}
