import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  //ATTRIBUTES
  //Variable de formularios
  form1:FormGroup;form2:FormGroup;form3:FormGroup;form4:FormGroup;form5:FormGroup;form6:FormGroup;form7:FormGroup;form8:FormGroup;form11:FormGroup;form12:FormGroup;
  //Variable de Resultados, datos de las consultas
  dataQuery1:any;dataQuery2:any;dataQuery3:any;dataQuery4:any;dataQuery5:any;dataQuery6:any;dataQuery7:any;dataQuery8:any;dataQuery9:any;dataQuery10:any;dataQuery11:any;dataQuery12:any;
  //Variable de existencia de respuesta
  result1=false;result2=false;result3=false;result4=false;result5=false;result6=false;result7=false;result8=false;result9=false;result10=false;result11=false;result12=false;
  

  constructor(private employeesService:EmployeesService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form1=this.formBuilder.group({ //formulario query 1
      fecha: ['', Validators.required]
    });
    this.form2=this.formBuilder.group({
      id_sucursal: ['', Validators.required]
    });
    this.form3=this.formBuilder.group({
      meses: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.form4=this.formBuilder.group({
      fecha_inicio: ['', Validators.required],
      fecha_final: ['', Validators.required]
    });
    this.form5=this.formBuilder.group({
      veces: ['', Validators.required]
    });
    this.form6=this.formBuilder.group({
      edad: ['', Validators.required]
    });
    this.form7=this.formBuilder.group({
      fecha: ['', Validators.required]
    });
    this.form8=this.formBuilder.group({
      marca: ['', Validators.required]
    });
    this.form11=this.formBuilder.group({
      sucursal_N: ['', Validators.required],
      sucursal_R: ['', Validators.required]
    });
  }

  //PETICIONES DE CONSULTAS
  getQuery1(){    
    if (this.form1.invalid) { //si es invalido, se retorna
      return;
    }
    this.result1=false;
    const fecha=this.form1.value;
    this.employeesService.getQuery1(fecha).subscribe(
      res=>{
        this.dataQuery1=res;
        this.result1=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery2(){    
    if (this.form2.invalid) { //si es invalido, se retorna
      return;
    }
    this.result2=false;
    const id_sucursal=this.form2.value;
    this.employeesService.getQuery2(id_sucursal).subscribe(
      res=>{
        this.dataQuery2=res;
        this.result2=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery3(){    
    if (this.form3.invalid) { //si es invalido, se retorna
      return;
    }
    this.result3=false;
    const data=this.form3.value;
    this.employeesService.getQuery3(data).subscribe(
      res=>{
        this.dataQuery3=res;
        this.result3=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery4(){    
    if (this.form4.invalid) { //si es invalido, se retorna
      return;
    }
    this.result4=false;
    const data=this.form4.value;
    this.employeesService.getQuery4(data).subscribe(
      res=>{
        this.dataQuery4=res;
        this.result4=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery5(){    
    if (this.form5.invalid) { //si es invalido, se retorna
      return;
    }
    this.result5=false;
    const data=this.form5.value;
    this.employeesService.getQuery5(data).subscribe(
      res=>{
        this.dataQuery5=res;
        this.result5=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery6(){    
    if (this.form6.invalid) { //si es invalido, se retorna
      return;
    }
    this.result6=false;
    const data=this.form6.value;
    this.employeesService.getQuery6(data).subscribe(
      res=>{
        this.dataQuery6=res;
        this.result6=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery7(){    
    if (this.form7.invalid) { //si es invalido, se retorna
      return;
    }
    this.result7=false;
    const data=this.form7.value;
    this.employeesService.getQuery7(data).subscribe(
      res=>{
        this.dataQuery7=res;
        this.result7=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery8(){    
    if (this.form8.invalid) { //si es invalido, se retorna
      return;
    }
    this.result8=false;
    const data=this.form8.value;
    this.employeesService.getQuery8(data).subscribe(
      res=>{
        this.dataQuery8=res;
        this.result8=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery9(){    
    this.result9=false;
    this.employeesService.getQuery9().subscribe(
      res=>{
        this.dataQuery9=res;
        this.result9=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery10(){    
    this.result10=false;
    this.employeesService.getQuery10().subscribe(
      res=>{
        this.dataQuery10=res;
        this.result10=true;
      },
      err=>console.error(err)      
    );
  }
  getQuery11(){    
    if (this.form11.invalid) { //si es invalido, se retorna
      return;
    }
    this.result11=false;
    const data=this.form11.value;
    this.employeesService.getQuery11(data).subscribe(
      res=>{
        this.dataQuery11=res;
        this.result11=true;
      },
      err=>console.error(err)      
    );
  }
  
  

}
