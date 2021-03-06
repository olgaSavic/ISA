import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {FormBuilder} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {HotelService} from '../../../service/hotel.service';
import {OcenaHotelService} from "../../../service/ocenaHotel.service";

@Component({
  selector: 'app-brza-rezervacija-hoteli-izbor',
  templateUrl: './brza-rezervacija-hoteli-izbor.component.html',
  styleUrls: ['./brza-rezervacija-hoteli-izbor.component.css'],
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
export class BrzaRezervacijaHoteliIzborComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  hotels = [];

  showMap: boolean;
  showLocation: boolean;
  hideData: boolean;
  tempAdresa: any;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              public fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private hotelService: HotelService,
              private ocenaService: OcenaHotelService) {

    this.userService.vratiTrenutnogKorisnikaAutor().subscribe(
      data => {

        if(data.uloga == "ADMINISTRATOR_RENT_A_CAR"){
          this.router.navigate(["rentAdminPage"]);
        } else if(data.uloga == "ADMINISTRATOR_AVIOKOMPANIJE"){
          this.router.navigate([""]);
        } else if(data.uloga == "ADMINISTRATOR_SISTEMA"){
          this.router.navigate(["systemAdminPage"]);
        } else if(data.uloga == "ADMINISTRATOR_HOTELA"){
          this.router.navigate(["hotelAdminPage"]);
        }

      },

      error => {
        this.router.navigate(["prijava"]);
      }
    )
  }

  ngOnInit() {

    this.showMap = false;
    this.showLocation = false;
    this.hideData = false;

    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    this.hotelService.getAllHotelsByAddress(idRezervacijeLeta).subscribe(data => {
      this.hotels = data;

      for (let hotel of this.hotels)
      {
        this.ocenaService.getProsecnaOcenaHotel(hotel.id).subscribe(data => {
          hotel.ocena = data ;
        })
      }
    });

  }

  showOnMap(adresa: any) {

    this.hideData = true;
    this.showLocation = true;
    this.tempAdresa = adresa;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      //this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.showMap = true;

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  closeMap() {
    this.hideData = false;
    this.showMap = false;
    this.showLocation = false;
  }

  izaberiHotel(id: any) {
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    this.router.navigateByUrl('brzaRezervacija/sobe/' + + idRezervacijeLeta + '/' + id);

  }

  goBack(){
    const idRezervacijeLeta = this.route.snapshot.params.idRezervacijeLeta;
    this.router.navigateByUrl('brzaRezervacija/hoteli/' + idRezervacijeLeta);
  }

  logout()
  {
    this.authService.logOutUser();
  }

}
