import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu-e-admin',
  templateUrl: './menu-e-admin.component.html',
  styleUrls: ['./menu-e-admin.component.css']
})
export class MenuEAdminComponent implements OnInit {
  //ATTRIBUTES
  datosEmpleado:any;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.datosEmpleado=this.authenticationService.currentUserValue; //retorna un array con los datos
  }

}
