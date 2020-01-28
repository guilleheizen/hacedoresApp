
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-acciones',
  templateUrl: 'acciones.page.html',
  styleUrls: ['acciones.page.scss']
})
export class AccionesPage implements OnInit {

  constructor(
    public st: LoginService,
    public datos: DatosService
  ) {}

  ngOnInit() {
    this.datos.getEquipos();
  }
}
