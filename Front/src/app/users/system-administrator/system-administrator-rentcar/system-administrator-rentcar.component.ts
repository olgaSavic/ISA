import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RentCarService} from '../../../service/rentcar.service';
import {UserService} from '../../../service/user.service';
import {HotelModel} from '../../../model/hotel.model';
import {RentCarModel} from '../../../model/rentcar.model';

@Component({
  selector : 'system-administrator-rentcar',
  templateUrl : './system-administrator-rentcar.component.html',
  styleUrls   : ['./system-administrator-rentcar.component.scss']
})
export class SystemAdministratorRentcarComponent implements  OnInit {

  public form: FormGroup;
  public name: AbstractControl;
  public address: AbstractControl;
  public description: AbstractControl;
  public administratorRentCar: AbstractControl;

  administratoriRentCar = []

  constructor(protected  router: Router,
              public fb: FormBuilder,
              public route: ActivatedRoute,
              public rentCarService: RentCarService,
              public userService: UserService) {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'description': ['', Validators.compose([Validators.required])],
      'administratorRentCar': ['', Validators.compose([Validators.required])]
    })

    this.name = this.form.controls['name'];
    this.address = this.form.controls['address'];
    this.description = this.form.controls['description'];
    this.administratorRentCar = this.form.controls['administratorRentCar'];

  }

  public ngOnInit() {
    this.userService.getRentCarAdministrators().subscribe(data => {
      this.administratoriRentCar = data;
    })
  }

  confirmClick() {
    this.registerRentCar();
  }

  registerRentCar() {
    const rentCar = new RentCarModel(
      this.name.value,
      this.address.value,
      this.description.value,
      this.administratorRentCar.value,
    );

    this.rentCarService.registerRentCar(rentCar).subscribe(data => {
      this.router.navigateByUrl('administratorPage');
    })
  }

  exit() {
    this.router.navigateByUrl('/welcomepage');
  }


}