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
  getRentList(id_sucursal:any){ //obtengo las rentas en la que la suc de retiro y devolucion son del empleado
    return this.http.get(`${this.API_URI}/employee/rents-list/${id_sucursal}`); 
  }
  getBranch(id_sucursal:any){ //obtengo la sucursal del parametro
    return this.http.get(`${this.API_URI}/employee/branch/${id_sucursal}`);
  }

  //PETICIONES HTTP PARA LAS CONSULTAS 
  getQuery1(fecha:any){
    return this.http.post(`${this.API_URI}/employee/query1`,fecha);
  }
  getQuery2(id_sucursal:any){
    return this.http.post(`${this.API_URI}/employee/query2`,id_sucursal);
  }
  getQuery3(data:any){
    return this.http.post(`${this.API_URI}/employee/query3`,data);
  }
  getQuery4(data:any){
    return this.http.post(`${this.API_URI}/employee/query4`,data);
  }
  getQuery5(data:any){
    return this.http.post(`${this.API_URI}/employee/query5`,data);
  }
  getQuery6(data:any){
    return this.http.post(`${this.API_URI}/employee/query6`,data);
  }
  getQuery7(data:any){
    return this.http.post(`${this.API_URI}/employee/query7`,data);
  }
  getQuery8(data:any){
    return this.http.post(`${this.API_URI}/employee/query8`,data);
  }
  getQuery9(){
    return this.http.get(`${this.API_URI}/employee/query9`);
  }
  getQuery10(){
    return this.http.get(`${this.API_URI}/employee/query10`);
  }
  getQuery11(data:any){
    return this.http.post(`${this.API_URI}/employee/query11`,data);
  }
}
