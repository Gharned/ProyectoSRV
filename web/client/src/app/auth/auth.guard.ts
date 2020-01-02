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
    if( (state.url=='/employee/menu-rentador') || (state.url=='/employee/rents-list') ){ //vistas del rentador
      if (this.authenticationService.isAuthenticatedOnRentador()) {  //se pregunta si tiene un cargo de rentador para entrar a esa vista
        return true;// logged in so return true
      }
    }else{
      if( (state.url=='/employee/menu-admin') || (state.url=='/employee/queries') ){ //vistas del administrador
        if (this.authenticationService.isAuthenticatedOnAdmin()) { 
          return true;// logged in so return true
        }
      }
    }

    //Las rutas que sirvan para el rentador y administrador pasaran por aca
    if(this.authenticationService.isAuthenticated()){ 
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
