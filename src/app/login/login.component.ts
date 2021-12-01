import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { BackendService } from '../backend.service';

interface Usuario {
  codigo: string;
  contrasenia: string;
}


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: any;
  titulo = "Login";

  constructor(
    private fb: FormBuilder,
    private servicioBackend: BackendService
  ) {

    this.formLogin = this.fb.group(
      {
        email: ['', Validators.required],
        contrasenia: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }

  autenticar(): void {

    const contraseniaEncriptada = Md5.hashStr(this.formLogin.controls.contrasenia.value);
    const credenciales = this.formLogin.getRawValue();
    credenciales.contrasenia = contraseniaEncriptada;
    this.servicioBackend.autenticar(JSON.stringify(credenciales)).subscribe(
      {
        next: (data) => {

          if(data && data.length > 0) {
            alert('Felicidades estas logueado');
          } else {
            alert('Lo sentimos, las credenciales son incorrectas');
          }

          console.log(data);
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
          console.log('completo');
        }
      }

    )

    // alert(JSON.stringify(credenciales));

  }

}
