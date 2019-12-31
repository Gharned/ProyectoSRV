import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
@Component({
  selector: 'app-menu-e-rentador',
  templateUrl: './menu-e-rentador.component.html',
  styleUrls: ['./menu-e-rentador.component.css']
})
export class MenuERentadorComponent implements OnInit {

  //ATTRIBUTES
  datosEmpleado:any;
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.datosEmpleado=this.authenticationService.currentUserValue; //retorna un array con los datos
  }


}
