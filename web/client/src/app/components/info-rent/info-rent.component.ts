import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-rent',
  templateUrl: './info-rent.component.html',
  styleUrls: ['./info-rent.component.css']
})
export class InfoRentComponent implements OnInit {
  //ATTRIBUTES
  dataRenta:any;
  id_renta:string;
  //Mensajes destinados a componentes etiquetas
  mensajeVeh:string='Datos del vehiculo';
  mensajeSucRet:string='Sucursal retiro';
  mensajeSucDev:string='Sucursal devolucion';
  mensajeClient:string='Datos del cliente';

  constructor(private activatedRoute:ActivatedRoute,private employeesService:EmployeesService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id_renta=this.activatedRoute.snapshot.params.id_renta;
    this.employeesService.getRent(this.id_renta).subscribe(
      res=>{
        this.dataRenta=res;
      },
      err=>console.error(err)
    ); 
  }


}
