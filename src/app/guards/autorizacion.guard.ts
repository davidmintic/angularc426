import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { BackendService } from '../backend.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate, CanActivateChild {

  constructor(
    private servicioBackend: BackendService,
    private router: Router

    ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.servicioBackend.token) {
        return true;
      } else {

        Swal.fire(
          '!!!',
          'Ups no tiene sesión activa',
          'error'
        );
        this.router.navigate(['/sesion/login']);
        return false;
      }
      
    
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
