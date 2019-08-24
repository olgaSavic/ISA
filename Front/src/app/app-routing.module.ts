import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import { SystemAdministratorComponent} from './users/system-administrator/system-administrator.component';
import {HotelAdministratorComponent} from './users/hotel-administrator/hotel-administrator.component';
import {RegistracijaComponent} from "./registracija/registracija.component";
import {PrijavaComponent} from "./prijava/prijava.component";
import {EditHotelComponent} from './hotels/edit-hotel/edit-hotel.component';
import {RoomsComponent} from './hotels/rooms/rooms.component';
import {AddEditRoomComponent} from './hotels/add-edit-room/add-edit-room.component';
import {AdditionalServicesComponent} from './hotels/additional-services/additional-services.component';
import {RegisteredUserComponent} from "./users/registered-user/registered-user.component";
import {RentAdministratorComponent} from "./users/rent-administrator/rent-administrator.component";
import {PricelistsComponent} from './hotels/pricelists/pricelists.component';
import {AddEditPricelistComponent} from './hotels/add-edit-pricelist/add-edit-pricelist.component';
import {PricesComponent} from './hotels/prices/prices.component';
import {AddEditPriceComponent} from './hotels/add-edit-price/add-edit-price.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent , pathMatch: 'full'},

  {path: 'hotelAdminPage', component: HotelAdministratorComponent},
  {path: 'hotelAdminPage/editHotel/:idHotela', component: EditHotelComponent},
  {path: 'hotelAdminPage/rooms/:idHotela', component: RoomsComponent},
  {path: 'hotelAdminPage/pricelists/:idHotela', component: PricelistsComponent},
  {path: 'hotelAdminPage/prices/:idPriceList', component: PricesComponent},
  {path: 'hotelAdminPage/additionalServices/:idHotela', component: AdditionalServicesComponent},
  {path: 'hotelAdminPage/room/:idHotela/:mode/:idRoom', component: AddEditRoomComponent},
  {path: 'hotelAdminPage/pricelist/:idHotela/:mode/:idPriceList', component: AddEditPricelistComponent},
  {path: 'hotelAdminPage/price/:idPriceList/:mode/:idPrice', component: AddEditPriceComponent},
  {path: 'systemAdminPage', component: SystemAdministratorComponent},
  {path: 'welcomepage', component: WelcomePageComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'registrovaniKorisnik', component: RegisteredUserComponent},
  {path: 'rentAdminPage', component: RentAdministratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true}), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
