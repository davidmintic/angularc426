import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  rutaRaiz = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRequest(ruta: string): Observable<any> {
    return this.http.get(this.rutaRaiz + ruta);
  }

}
