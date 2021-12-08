import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private router: Router) { }

  cerrarSesion(): void {
    localStorage.removeItem('tk');
    this.router.navigate(['/login']);
  }
}
