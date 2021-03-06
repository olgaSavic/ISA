import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimePeriodModel} from '../../../model/timePeriod.model';
import {VoziloService} from "../../../service/vozilo.service";
import {RentCarService} from "../../../service/rentcar.service";
import {OcenaVoziloService} from "../../../service/ocenaVozilo.service";

@Component({
  selector: 'app-welcome-page-servisi-vozila',
  templateUrl: './welcome-page-servisi-vozila.component.html',
  styleUrls: ['./welcome-page-servisi-vozila.component.css'],
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
export class WelcomePageServisiVozilaComponent implements OnInit {

  public form: FormGroup;
  public startDate: AbstractControl;
  public endDate: AbstractControl;
  d1: any;
  d2: any;
  vozila = [];
  nazivRent: string;
  timePeriodConfirmed: boolean;

  rating: any ;


  constructor(protected  router: Router,
              public fb: FormBuilder,
              private route: ActivatedRoute,
              private voziloService: VoziloService,
              private rentService: RentCarService,
              private ocenaService: OcenaVoziloService) {

    this.form = this.fb.group({
      'startDate': ['', Validators.compose([Validators.required])],
      'endDate': ['', Validators.compose([Validators.required])],
    })
    this.startDate = this.form.controls['startDate'];
    this.endDate = this.form.controls['endDate'];
  }

  ngOnInit() {
    this.timePeriodConfirmed = false;

    const idRent = this.route.snapshot.params.idRent;

    this.rentService.getRent(idRent).subscribe(data => {
      this.nazivRent = data.naziv;
    })
  }

  goBack(){
    this.router.navigateByUrl('welcomepage' );
  }

  confirmClick() {

    this.timePeriodConfirmed = true;
    const idRent = this.route.snapshot.params.idRent;

    this.d1 = this.startDate.value;
    this.d2 = this.endDate.value;

    const timePeriod = new TimePeriodModel (
      this.d1,
      this.d2
    );

    this.voziloService.getAvailableVozila(timePeriod, idRent).subscribe(data => {
      this.vozila = data;

      for (let vozilo of this.vozila)
      {
        this.ocenaService.getProsecnaOcenaVozila(vozilo.voziloId).subscribe(data => {
          vozilo.ocena = data ;
        })
      }
    });
  }

  ulogujSe() {
    this.router.navigateByUrl('/prijava');
  }

  registrujSe() {
    this.router.navigateByUrl('/registracija');
  }

  vratiProsecnuOcenu(id: any)
  {
    this.ocenaService.getProsecnaOcenaVozila(id).subscribe(data => {
      this.rating = data;
      if (data == 0 || data == undefined)
      {
        alert('Za ovo vozilo nije moguce prikazati prosecnu ocenu!')
      }
      else
      {
        alert('Prosecna ocena ovog vozila je: ' + data);
      }
    })
  }

}
