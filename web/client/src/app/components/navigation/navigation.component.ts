import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";
import { UserEmployee } from 'src/app/models/UserEmployee';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  //ATTRIBUTES
  currentUser: UserEmployee;

  constructor(private router: Router,private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() { //cierra sesion del usuario
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
