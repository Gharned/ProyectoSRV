import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from "../../services/employees.service";

@Component({
  selector: 'app-branch-d',
  templateUrl: './branch-d.component.html',
  styleUrls: ['./branch-d.component.css']
})
export class BranchDComponent implements OnInit {
  //ATTRIBUTES
  @Input() branch:number; //sucursal pasada por input
  @Input() titulo:string; //mensaje de pertenecia
  dataBranch:any; //contiene los datos de la sucursal

  constructor(private employeesService:EmployeesService) { }

  ngOnInit() {
    this.employeesService.getBranch(this.branch).subscribe(
      res=>{
        this.dataBranch=res;
      },
      err=>console.error(err)
    );
  }

}
