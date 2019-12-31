import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //se necesita para datetimepicker

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RentComponent } from './components/rent/rent.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { RentService} from './services/rent.service';
import { RentDetailsComponent } from './components/rent-details/rent-details.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { SinesterComponent } from './components/sinester/sinester.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { MenuERentadorComponent } from './components/menu-e-rentador/menu-e-rentador.component';
import { RentsListComponent } from './components/rents-list/rents-list.component';
import { MenuEAdminComponent } from './components/menu-e-admin/menu-e-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RentComponent,
    VehiclesListComponent,
    RentDetailsComponent,
    DatepickerComponent,
    TimepickerComponent,
    SinesterComponent,
    LoginComponent,
    AlertComponent,
    MenuERentadorComponent,
    RentsListComponent,
    MenuEAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    RentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
