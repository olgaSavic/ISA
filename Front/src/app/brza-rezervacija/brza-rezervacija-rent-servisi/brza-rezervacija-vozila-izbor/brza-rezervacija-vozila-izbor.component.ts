import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {FormBuilder} from '@angular/forms';
import {VoziloService} from "../../../service/vozilo.service";
import {VoziloReservationService} from "../../../service/voziloReservation.service";

@Component({
  selector: 'app-brza-rezervacija-vozila-izbor',
  templateUrl: './brza-rezervacija-vozila-izbor.component.html',
  styleUrls: ['./brza-rezervacija-vozila-izbor.component.css']
})
export class BrzaRezervacijaVozilaIzborComponent implements OnInit {

  vozila = [];

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              public fb: FormBuilder,
              private voziloService: VoziloService,
              private reservationService: VoziloReservationService) { }

  ngOnInit() {
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    const idRent = this.route.snapshot.params.idRent;
    this.voziloService.getVozilaAtDiscount(idRezervacijeLeta, idRent).subscribe(data => {
      this.vozila = data;
    });
  }

  goBack() {
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    this.router.navigateByUrl('brzaRezervacija/rentServisi/' + idRezervacijeLeta + '/izbor');
  }

  logout()
  {
    this.authService.logOutUser();
  }

  rezervisi(id: any) {
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    const idRent = this.route.snapshot.params.idRent;
    this.reservationService.createFastResRent(idRezervacijeLeta, idRent, id).subscribe(data => {
      alert('Uspesna rezervacija vozila!');
      location.reload();
    });
  }

  zavrsiRezervaciju() {
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    this.router.navigateByUrl('welcomepage');
  }

}