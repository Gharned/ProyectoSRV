import { Component, OnInit } from '@angular/core';
import { RentService } from "../../services/rent.service";
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-sinester',
  templateUrl: './sinester.component.html',
  styleUrls: ['./sinester.component.css']
})
export class SinesterComponent implements OnInit {
  //ATTRIBUTES
  matriculas:any; //almacena las matriculas de los vehiculos
  checkoutFormSinester:any; //almacena datos del formulario siniestro
  private _error = new Subject<string>();
  errorMessage: string; //Muestra mensaje cuando no estan completos los datos

  constructor(private rentService:RentService, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.rentService.getMatriculaVehiculo().subscribe( //obtengo las matriculas de los vehiculos
      res=>{
        this.matriculas=res;
        },
        err=>console.log(err)
      );
    this.checkoutFormSinester=this.formBuilder.group({ //se inicializa el formulario de filtro
      matricula:"",
      nombre_respon:"",
      email:"",
      descripcion:"",
      fecha_siniestro:""
    });
    this._error.subscribe((message) => this.errorMessage = message); //forma que actuara el menssaje de error
      this._error.pipe(
       debounceTime(5000) //milisegundos que demora en desaparecer el mensaje
      ).subscribe(() => this.errorMessage = null);
  }

  onSubmit(sinesterForm) { //se verifica el formulario de filtro
    if( !(sinesterForm.matricula=="") && !(sinesterForm.nombre_respon=="") && !(sinesterForm.email=="") && !(sinesterForm.descripcion=="") && !(sinesterForm.fecha_siniestro=="") ){
      var flag=false; var index=0;
      while( (flag==false) && (index < this.matriculas.length) ){ //recorro las matriculas existentes
       if(this.matriculas[index].matricula===sinesterForm.matricula){ //si existe la matricula permito que haga el post
          flag=true; //corto el while  
        }
        index++;
      }
      if(flag==true){
        this.rentService.postSinester(sinesterForm).subscribe(
          res=>{
            console.log(res);
          },
          err=>{
            console.log(err);
          }
        );
        this.checkoutFormSinester.reset();
        this.router.navigate(['/rent']); //cuando almacene los valores, lo envio a la ruta principal
      }else{  //sino activar un mensaje de error
        this._error.next("No existe tal matricula");
      }
    }else{
      this._error.next("Complete todos los datos");
    }
  }

}
