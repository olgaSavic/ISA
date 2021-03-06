import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RentCarService} from "../../service/rentcar.service";
import {Observable} from 'rxjs';
import {AbstractControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {SearchRentsModel} from "../../model/searchRents.model";
import {OcenaRentService} from "../../service/ocenaRent.service";


@Component({
  selector: 'app-welcome-page-servisi',
  templateUrl: './welcome-page-servisi.component.html',
  styleUrls: ['./welcome-page-servisi.component.css'],
  styles: [`
    .star {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: darkgray;
    }
    .full {
      color: dodgerblue;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: dodgerblue;
    }
  `]
})
export class WelcomePageServisiComponent implements OnInit {

  rents = [];
  pretraga: boolean;

  rating: any;

  public form: FormGroup;
  public startDate: AbstractControl;
  public endDate: AbstractControl;
  public rentName: AbstractControl;
  public rentLocation: AbstractControl;
  d1: any;
  d2: any;

  constructor(protected router: Router, public fb: FormBuilder,
              private route: ActivatedRoute, private rentService: RentCarService,
              private ocenaService: OcenaRentService) {
    // pretraga rent servisa

    this.form = this.fb.group({
      'startDate': ['', Validators.compose([Validators.required])],
      'endDate': ['', Validators.compose([Validators.required])],
      'rentName': [''],
      'rentLocation': [''],
    })

    this.startDate = this.form.controls['startDate'];
    this.endDate = this.form.controls['endDate'];
    this.rentName = this.form.controls['rentName'];
    this.rentLocation = this.form.controls['rentLocation'];
  }

  ngOnInit() {
    this.pretraga = false ;
    this.rentService.getAllRents().subscribe(data => {
      this.rents = data ;

      for (let rent of this.rents)
      {
        this.ocenaService.getProsecnaOcenaRent(rent.rentACarId).subscribe(data => {
          rent.ocena = data ;
        })
      }
    });
  }

  goBack() {
    location.reload();
  }

  pretraziRentServise()
  {
    this.pretraga = true ;
  }

  pregledVozila(idRent: any)
  {
    this.router.navigateByUrl('welcomepage/vozila/' + idRent);
  }

  pregledFilijala(idRent: any)
  {
    this.router.navigateByUrl('welcomepage/filijale/' + idRent);

  }

  pregledCenovnika(idRent: any)
  {
    this.router.navigateByUrl('welcomepage/pricelistRent/' + idRent);
  }

  confirmClick() {
    if (this.startDate.value > this.endDate.value ) {
      alert('Uneti datum nije validan. Pokušajte ponovo.');
      this.startDate.reset();
      this.endDate.reset();
      return;
    }

    this.d1 = this.startDate.value;
    this.d2 = this.endDate.value;

    const searchRents = new SearchRentsModel (
      this.rentName.value,
      this.rentLocation.value,
      this.d1,
      this.d2
    );

    this.rentService.searchRents(searchRents).subscribe(data => {
      this.rents = data;
      this.pretraga = false;
    });
  }

  vratiProsecnuOcenu(id: any)
  {
    this.ocenaService.getProsecnaOcenaRent(id).subscribe(data => {
      this.rating = data;
      if (data == 0 || data == undefined)
      {
        alert('Za ovaj rent-a-car servis nije moguce prikazati prosecnu ocenu!')
      }
      else
      {
        alert('Prosecna ocena ovog rent-a-car servisa je: ' + data);
      }
    })
  }

}
