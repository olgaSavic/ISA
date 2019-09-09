import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {FormBuilder} from '@angular/forms';
import {RentCarService} from "../../../service/rentcar.service";

@Component({
  selector: 'app-brza-rezervacija-rent-servisi-izbor',
  templateUrl: './brza-rezervacija-rent-servisi-izbor.component.html',
  styleUrls: ['./brza-rezervacija-rent-servisi-izbor.component.css']
})
export class BrzaRezervacijaRentServisiIzborComponent implements OnInit {

  rents = [];

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              public fb: FormBuilder,
              private rentService: RentCarService) { }

  ngOnInit() {
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    this.rentService.getAllRentsByAddress(idRezervacijeLeta).subscribe(data => {
      this.rents = data;
    });
  }

  izaberiRent(id: any) {
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    this.router.navigateByUrl('brzaRezervacija/vozila/' + idRezervacijeLeta + '/' + id);

  }

  goBack(){
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    this.router.navigateByUrl('brzaRezervacija/rentServisi/' + idRezervacijeLeta);
  }

  logout()
  {
    this.authService.logOutUser();
  }

}