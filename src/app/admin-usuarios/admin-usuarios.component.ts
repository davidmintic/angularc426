import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2'
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {


  formUsuario: any;
  listaUsuarios: any[] = [];
  idUsuarioActual = '';
  modoCrud = 'adicion';


  constructor(
    private fb: FormBuilder,
    private servicioBackend: BackendService,
    private servicioGlobal: GlobalService
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

    this.servicioGlobal.rutaActual = 'admin/admin-usuarios';
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


  iniciarAdicion(): void {
    this.modoCrud = 'adicion';
  }


  crearUsuarios(): void {

    const usuarioNuevo = this.formUsuario.getRawValue();
    usuarioNuevo['contrasenia'] = 'xxx';


    this.servicioBackend.postRequest('usuarios', JSON.stringify(usuarioNuevo)).subscribe(
      {
        next: (data) => {
          this.listaUsuarios.unshift(data);

          Swal.fire('Felicidades', 'Has creado un nuevo usuario', 'success');
          this.formUsuario.reset();
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


  iniciarEdicion(usuario: any): void {
    this.formUsuario.patchValue(usuario);
    this.idUsuarioActual = usuario.id;
    this.modoCrud = 'edicion';
  }

  editar(): void {

    const newUser = this.formUsuario.getRawValue();
    this.servicioBackend.patchRequest('usuarios', this.idUsuarioActual, newUser).subscribe(
      {
        next: (data) => {

          this.obtenerUsuarios();
          Swal.fire('Felicidades', 'Has editado al usuario', 'success');
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


  eliminarUsuario(usuario: any) {

    this.servicioBackend.deleteRequest('usuarios', usuario.id).subscribe(

      {
        next: (data) => {

          this.obtenerUsuarios();
          Swal.fire('!!!', 'Has eliminado al usuario ' + usuario.nombre, 'success');
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
