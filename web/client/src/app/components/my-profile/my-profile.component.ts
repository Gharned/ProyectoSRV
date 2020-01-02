import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  //ATTRIBUTES
  datosEmpleado:any;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.datosEmpleado=this.authenticationService.currentUserValue; //retorna un array con los datos
  }

}
