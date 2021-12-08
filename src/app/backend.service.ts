import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  rutaRaiz = 'http://localhost:3000';
  token = '';

  constructor(private http: HttpClient) {

    const tk = localStorage.getItem('tk');
    if (tk) {
      this.token = tk;
    }

  }

  /**
   * 
   * @param controlador: este parametro nos indica el punto de acceso al 
   * servicio del backend
   * @returns 
   */
  getRequest(controlador: string): Observable<any> {
    return this.http.get(
      this.rutaRaiz + '/' + controlador,
      {
        headers: { 'Authorization': `Bearer ${this.token}` }
      }

    );
  }

   /**
   * 
   * @param controlador: este parametro nos indica el punto de acceso al 
   * servicio del backend
   * @returns 
   */
    getRequestFilter(controlador: string, filtro: string): Observable<any> {

      const parametros = new HttpParams().append('filter', filtro);

      return this.http.get(
        this.rutaRaiz + '/' + controlador,
        {
          headers: { 'Authorization': `Bearer ${this.token}` },
          params: parametros
        }
          
      );
    }


 
  deleteRequest(controlador: string, id: string): Observable<any> {

    const url = this.rutaRaiz + '/' + controlador + '/' + id;
    return this.http.delete(
      url,
      {
        headers: { 'content-type': 'application/json' }
      });
  }

  patchRequest(controlador: string, id: string, datos: string): Observable<any> {

    const url = this.rutaRaiz + '/' + controlador + '/' + id;
    return this.http.patch(
      url,
      datos, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  postRequest(controlador: string, datos: string): Observable<any> {

    const url = this.rutaRaiz + '/' + controlador;
    return this.http.post(
      url,
      datos, {
      headers: { 'content-type': 'application/json' }
    });
  }

  autenticar(credenciales: string): Observable<any> {
    // const filter = '{"where": ' + credenciales + '}';
    // const filterEncode = encodeURIComponent(filter);
    // return this.http.get(this.rutaRaiz + '/usuarios?filter=' + filterEncode);

    return this.http.post(
      this.rutaRaiz + '/autenticar',
      credenciales,
      {
        headers: { 'content-type': 'application/json' }
      }
    );

  }


}
