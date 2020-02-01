import { Component, OnInit, Input } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { Equipo } from '../../pages/interfaces/interfaces';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss'],
})
export class EquipoComponent implements OnInit {

  @Input() id: string;
  equipo: Equipo;

  constructor(
    public datos: DatosService
  ) { }

  ngOnInit() {
    console.log(this.datos.equipos);
    console.log(this.id);
    const posicion = this.datos.equipos.findIndex( eq => { eq._id === this.id;  } );
    console.log(posicion);
    this.equipo = this.datos.equipos[posicion];
  }

}
