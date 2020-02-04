import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-datos',
  templateUrl: 'datos.page.html',
  styleUrls: ['datos.page.scss']
})
export class DatosPage implements OnInit{

  constructor(
    public datos: DatosService
  ) {}

  ngOnInit() {
    this.datos.cargarVariables();
  }
}
