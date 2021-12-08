import { Component, HostListener } from '@angular/core';
import { BackendService } from './backend.service';
import { GlobalService } from './services/global.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-edufree-g26';
  openSideBar = true;

  constructor(
    private servicioBackend: BackendService,
    private servicioGlobal: GlobalService
  ) {

  }


  togleSideBar(): void {
    this.openSideBar = !this.openSideBar;
  }


  cerrarSesion(): void {
    this.servicioBackend.token = '';
    this.servicioGlobal.cerrarSesion();
  }

}
