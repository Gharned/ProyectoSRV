import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service"; //servicio de autentificacion
import { AlertService } from "../../services/alert.service"; //servicio de alerta
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; //datos del formulario del login
  loading = false; //para dar el estado de carga al enviar
  submitted = false; //para saber si el formulario fue enviado
  existeUsuario=true;
  //returnUrl: string;
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService,private alertService:AlertService) {
    // redirecciona a home si antes ya inicio sesion
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        rut_empleado: ['', Validators.required],
        contrasena: ['', Validators.required]
    });
  }

  // Obtencion de conveniencia para un fácil acceso a los campos de formulario
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.existeUsuario=true;
    // reinicia el alert en onSubmit
    this.alertService.clear();

    // retorna aqui si es invalido el formulario
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.rut_empleado.value, this.f.contrasena.value)
        .pipe(first())
        .subscribe(
            data => { //data contiene la informacion del empleado y vemos donde redireccionar la ruta, dependiendo del cargo 
              if(data[0].cargo=='Rentador'){ //pregunto si cargo es igual rentador
                this.router.navigate(['employee/menu-rentador']);
              }else{
                if(data[0].cargo=='Administrador'){
                  this.router.navigate(['employee/menu-admin']);
                }
              }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
                this.existeUsuario=false;
            });
}
  

}
