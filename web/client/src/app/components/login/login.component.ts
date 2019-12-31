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
  returnUrl: string;
  
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
    // se enviara a la siguiente ruta cuando se haya enviado el formulario
    this.returnUrl='employee/rents';
  }

  // Obtencion de conveniencia para un fácil acceso a los campos de formulario
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

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
            data => { //data contiene la informacion del empleado
                this.router.navigate([this.returnUrl]);//ver donde redireccionar la ruta, dependiendo del cargo                                        this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
  

}
