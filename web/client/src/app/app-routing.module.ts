import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RentComponent} from './components/rent/rent.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { RentDetailsComponent } from './components/rent-details/rent-details.component';
import { SinesterComponent } from "./components/sinester/sinester.component";
import { LoginComponent } from "./components/login/login.component";
import { RentsEmployeeComponent } from "./components/rents-employee/rents-employee.component";
import { AuthGuard } from "./auth/auth.guard";

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
  {path:'employee/rents',component:RentsEmployeeComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
