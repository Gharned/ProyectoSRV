import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserEmployee } from '../models/UserEmployee';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //ATTRIBUTES
  API_URI='http://localhost:3000/api';
  private currentUserSubject: BehaviorSubject<UserEmployee>; 
  public currentUser: Observable<UserEmployee>;

  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<UserEmployee>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserEmployee {
    return this.currentUserSubject.value;
  }

  login(rut_empleado, contrasena) { //login del empleado
    return this.http.post<any>(`${this.API_URI}/employee/authentication`, { rut_empleado, contrasena })
        .pipe(map(user => {
            //almacenar detalles de usuario y token jwt en almacenamiento local para mantener al usuario conectado entre actualizaciones de pagina
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user); //se le asigna el valor user
            return user;
    }));
  }

  logout() { //logout del empleado
    // remueve al usuario del almacenamiento local y al usuario actual se le asigna null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public isAuthenticatedOnRentador():Boolean{ //se autentifica que el usuario este logeado y sea rentador
    if(this.currentUser!=null){ //si no es null, significa que ya inicio sesion
      if(this.currentUserSubject.getValue()[0].cargo=='Rentador'){ //si es rentador se le permite ingresar a esa ruta
        return true;
      }
    }
    return false;
  }

  public isAuthenticatedOnAdmin():Boolean{ //se autentifica que el usuario este logeado y sea Administrador
    if(this.currentUser!=null){ //si no es null, significa que ya inicio sesion
      if(this.currentUserSubject.getValue()[0].cargo=='Administrador'){ //si es admin se le permite ingresar a esa ruta
        return true;
      }
    }
    return false;
  }
}
