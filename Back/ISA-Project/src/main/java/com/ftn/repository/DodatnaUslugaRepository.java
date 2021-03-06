package com.ftn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.enums.TipDodatneUsluge;
import com.ftn.model.hotels.DodatnaUsluga;

public interface DodatnaUslugaRepository extends JpaRepository<DodatnaUsluga, Long> {

	DodatnaUsluga findByTipDodatneUsluge(TipDodatneUsluge tipDodatneUsluge);

}
