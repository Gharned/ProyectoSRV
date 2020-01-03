import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-vehicle-d',
  templateUrl: './vehicle-d.component.html',
  styleUrls: ['./vehicle-d.component.css']
})
export class VehicleDComponent implements OnInit {
  //ATTRIBUTES
  @Input() vehicle:number; //rut_cliente pasada por input
  @Input() titulo:string;
  dataVehicle:any; //contiene los datos del cliente
  mensaje:string='Sucursal del vehiculo';

  constructor(private employeesService:EmployeesService) { }

  ngOnInit() {
    this.employeesService.getVehicle(this.vehicle).subscribe(
      res=>{
        this.dataVehicle=res;
      },
      err=>console.error(err)
    );
  }
}
