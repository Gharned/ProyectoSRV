import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  //ATTRIBUTES
  typeEmployee:string; //veremos que metodo usar dependiendo del tipo de empleado

  constructor(private router: Router, private authenticationService: AuthenticationService) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if( (state.url.startsWith('/employee/menu-rentador')) || (state.url.startsWith('/employee/rents-list')) || (state.url.startsWith('/employee/info-rent')) ){ //vistas del rentador
      if (this.authenticationService.isAuthenticatedOnRentador()) {  //se pregunta si tiene un cargo de rentador para entrar a esa vista
        return true;// logged in so return true
      }else{
        return false; //no es rentador
      }
    }else{
      if( (state.url.startsWith('/employee/menu-admin')) || (state.url.startsWith('/employee/queries')) ){ //vistas del administrador
        if (this.authenticationService.isAuthenticatedOnAdmin()) { 
          return true;// logged in so return true
        }else{
          return false; //no es admin
        }
      }
    }

    //Las rutas que sirvan para el rentador y administrador pasaran por aca
    console.log("PASE POR ACA");
    
    if(this.authenticationService.isAuthenticated()){ 
      return true;
    }else{
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
