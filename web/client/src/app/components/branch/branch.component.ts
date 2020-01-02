import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from "../../services/employees.service";

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  //ATTRIBUTES
  @Input() branch:number; //sucursal pasada por input
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
