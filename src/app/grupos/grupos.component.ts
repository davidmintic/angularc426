import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {


  formUsuario: any;
  listaGrupos: any[] = [];
  idUsuarioActual = '';
  modoCrud = 'adicion';

  listaProgramasAcademicos: any[] = [];

  programaSeleccionado = '';


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

    this.obtenerProgramas();
    this.obtenerGrupos();

  }

  ngOnInit(): void {
  }


  obtenerProgramas(): void {

    this.servicioBackend.getRequest('programa-academicos').subscribe(
      {
        next: (data) => {

          this.listaProgramasAcademicos = data;
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


  obtenerGrupos(): void {

    const filtro = { "include": [{ "relation": "usuariosgrupo" }] };

    this.servicioBackend.getRequestFilter('grupos', JSON.stringify(filtro)).subscribe(
      {
        next: (data) => {

          this.listaGrupos = data;
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


  cambioDePrograma(valorNuevo: any): void {
    console.log(valorNuevo);
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
          this.listaGrupos.unshift(data);

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

          this.obtenerGrupos();
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

          this.obtenerGrupos();
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


  mostrarUsuarios(listaUsuarios: [any]): void {

    let stringUsuarios = '';

    listaUsuarios.forEach(element => {
      stringUsuarios += 'Nombre: ' + element.nombre + ' - ' + 'Email: ' + element.email + '\n';
    });

    alert(stringUsuarios);

  }


}
