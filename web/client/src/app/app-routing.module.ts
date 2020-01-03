import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RentComponent} from './components/rent/rent.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { RentDetailsComponent } from './components/rent-details/rent-details.component';
import { SinesterComponent } from "./components/sinester/sinester.component";
import { LoginComponent } from "./components/login/login.component";
import { MenuERentadorComponent } from "./components/menu-e-rentador/menu-e-rentador.component";
import { RentsListComponent } from "./components/rents-list/rents-list.component";
import { MenuEAdminComponent } from "./components/menu-e-admin/menu-e-admin.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { QueriesComponent } from "./components/queries/queries.component";
import { InfoRentComponent } from "./components/info-rent/info-rent.component";
import { AuthGuard } from "./auth/auth.guard"; //authguard activa los componentes, solo si es que tiene permiso

//me permite definir rutas de mi app
const routes: Routes = [
  {
    path:'',
    redirectTo:'/rent',
    pathMatch:'full'
  },
  {path:'rent',component:RentComponent},
  {path:'rent/search',component:VehiclesListComponent},
  {path:'rent/reserve/:matricula',component:RentDetailsComponent},
  {path:'sinester',component:SinesterComponent},
  {path:'login',component:LoginComponent},
  {path:'employee/menu-rentador',component:MenuERentadorComponent,canActivate:[AuthGuard]},
  {path:'employee/rents-list',component:RentsListComponent,canActivate:[AuthGuard]},
  {path:'employee/menu-admin',component:MenuEAdminComponent,canActivate:[AuthGuard]},
  {path:'employee/my-profile',component:MyProfileComponent,canActivate:[AuthGuard]},
  {path:'employee/queries',component:QueriesComponent,canActivate:[AuthGuard]},
  {path:'employee/info-rent/:id_renta',component:InfoRentComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
