import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {


  formUsuario: any;
  listaUsuarios: any[] = [];


  constructor(
    private fb: FormBuilder,
    private servicioBackend: BackendService
  ) {

    this.formUsuario = this.fb.group(
      {
        nombre: ['', Validators.required],
        email: ['', Validators.compose([Validators.email, Validators.required])]
      }
    );

    this.obtenerUsuarios();

  }

  ngOnInit(): void {
  }

  obtenerUsuarios(): void {

    this.servicioBackend.getRequest('usuarios').subscribe(
      {
        next: (data) => {

          this.listaUsuarios = data;
          console.log(data);
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
          console.log('completo');
        }
      }
    );
  }


  crearUsuarios(): void {

    const usuarioNuevo = this.formUsuario.getRawValue();
    usuarioNuevo['contrasenia'] = 'xxx';


    this.servicioBackend.postRequest('usuarios', JSON.stringify(usuarioNuevo)).subscribe(
      {
        next: (data) => {
          this.listaUsuarios.unshift(data);

          Swal.fire('Felicidades', 'Has creado un nuevo usuario', 'success');
          console.log(data);
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
          console.log('completo');
        }
      }
    );


  }

}
