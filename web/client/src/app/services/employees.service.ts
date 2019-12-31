import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  //ATTRIBUTES
  API_URI='http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  //PETINCIONES HTTP DEL EMPLEADO
  getRentList(id_sucusal){ //obtengo las rentas en la que la suc de retiro y devolucion son del empleado
    return this.http.get(`${this.API_URI}/employee/rents-list/${id_sucusal}`); 
  }
}
