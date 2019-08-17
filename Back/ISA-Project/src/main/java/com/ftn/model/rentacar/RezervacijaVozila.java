package com.ftn.model.rentacar;

import java.sql.Date;
import java.util.ArrayList;

// KORAK 2 tacka 2.10 
public class RezervacijaVozila 
{
	
	private Date datumPreuzimanja;
	private Lokacija mestoPreuzimanja;
	private Date datumVracanja;
	private Lokacija mestoVracanja;
	private String tipVozila;
	private int brPutnika;
	
	// FALI
	// opciono cenovni rang
	
	// lista rezervisanih vozila
	ArrayList<Vozilo> rezervisanaVozila;

	public RezervacijaVozila() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RezervacijaVozila(Date datumPreuzimanja, Lokacija mestoPreuzimanja, Date datumVracanja,
			Lokacija mestoVracanja, String tipVozila, int brPutnika) {
		super();
		this.datumPreuzimanja = datumPreuzimanja;
		this.mestoPreuzimanja = mestoPreuzimanja;
		this.datumVracanja = datumVracanja;
		this.mestoVracanja = mestoVracanja;
		this.tipVozila = tipVozila;
		this.brPutnika = brPutnika;
	}

	public Date getDatumPreuzimanja() {
		return datumPreuzimanja;
	}

	public void setDatumPreuzimanja(Date datumPreuzimanja) {
		this.datumPreuzimanja = datumPreuzimanja;
	}

	public Lokacija getMestoPreuzimanja() {
		return mestoPreuzimanja;
	}

	public void setMestoPreuzimanja(Lokacija mestoPreuzimanja) {
		this.mestoPreuzimanja = mestoPreuzimanja;
	}

	public Date getDatumVracanja() {
		return datumVracanja;
	}

	public void setDatumVracanja(Date datumVracanja) {
		this.datumVracanja = datumVracanja;
	}

	public Lokacija getMestoVracanja() {
		return mestoVracanja;
	}

	public void setMestoVracanja(Lokacija mestoVracanja) {
		this.mestoVracanja = mestoVracanja;
	}

	public String getTipVozila() {
		return tipVozila;
	}

	public void setTipVozila(String tipVozila) {
		this.tipVozila = tipVozila;
	}

	public int getBrPutnika() {
		return brPutnika;
	}

	public void setBrPutnika(int brPutnika) {
		this.brPutnika = brPutnika;
	}

	public ArrayList<Vozilo> getRezervisanaVozila() {
		return rezervisanaVozila;
	}

	public void setRezervisanaVozila(ArrayList<Vozilo> rezervisanaVozila) {
		this.rezervisanaVozila = rezervisanaVozila;
	}
	
	
	
	
}