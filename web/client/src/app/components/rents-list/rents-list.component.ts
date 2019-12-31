import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-rents-list',
  templateUrl: './rents-list.component.html',
  styleUrls: ['./rents-list.component.css']
})
export class RentsListComponent implements OnInit {
  //ATTRIBUTES
  rentas:any; //lista de rentas de la sucursal del empleado
  despliegue=false; //despliegue de mas informacion
  datosEmpleado:any; //almaceno los datos de empleados
  constructor(private employeeService:EmployeesService,private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.datosEmpleado=this.authenticationService.currentUserValue; //retorna un array con los datos
    this.employeeService.getRentList(this.datosEmpleado[0].id_sucursal).subscribe(
      res=>{
        this.rentas=res
      },
      err=>console.error(err)
    );
  }

}
