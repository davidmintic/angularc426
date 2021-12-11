import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  rutaActual = '';
  nombrePerfil = '';
  nombreUsuario = '';
  modulos: Item[] = [];

  constructor(private router: Router) {
    this.actualizarSideBar();
  }

  cerrarSesion(): void {
    localStorage.removeItem('tk');
    this.router.navigate(['/sesion/login']);
  }

  actualizarSideBar(): void {
    const perfil = localStorage.getItem('perfil');

    if (perfil) {
      const perfilJson = JSON.parse(perfil);
      this.modulos = perfilJson.modulos;
      this.nombrePerfil = perfilJson.nombre;

      const nombreUsuario = localStorage.getItem('nombreUsuario');
      if (nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
      }
    }

  }
}

export interface Item {
  nombre: string,
  ruta: string,
  bgcolor: string
}
