import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: 'eventos.page.html',
  styleUrls: ['eventos.page.scss']
})
export class EventosPage implements OnInit{

  constructor(
    public datos: DatosService
  ) {}

  ngOnInit() {
    this.datos.cargarVariables();
  }
}

