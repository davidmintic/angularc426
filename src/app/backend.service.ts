import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  rutaRaiz = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param controlador: este parametro nos indica el punto de acceso al 
   * servicio del backend
   * @returns 
   */
  getRequest(controlador: string): Observable<any> {
    return this.http.get(this.rutaRaiz + '/' + controlador);
  }

  postRequest(controlador: string, datos: string): Observable<any> {

    const url = this.rutaRaiz + '/' + controlador;
    return this.http.post(
      url,
      datos, {
      headers: { 'content-type': 'application/json'}
    });
  }

  autenticar(credenciales: string): Observable<any> {
    const filter = '{"where": ' + credenciales + '}';
    const filterEncode = encodeURIComponent(filter);
    return this.http.get(this.rutaRaiz + '/usuarios?filter=' + filterEncode);
  }


}
