import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-client-d',
  templateUrl: './client-d.component.html',
  styleUrls: ['./client-d.component.css']
})
export class ClientDComponent implements OnInit {

  //ATTRIBUTES
  @Input() client:number; //rut_cliente pasada por input
  @Input() titulo:string;
  dataClient:any; //contiene los datos del cliente

  constructor(private employeesService:EmployeesService) { }

  ngOnInit() {
    this.employeesService.getClient(this.client).subscribe(
      res=>{
        this.dataClient=res;
      },
      err=>console.error(err)
    );
  }

}
