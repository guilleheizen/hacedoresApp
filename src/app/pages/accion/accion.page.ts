import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosService } from '../../services/datos.service';
import { Actividad, Categoria } from '../interfaces/interfaces';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.page.html',
  styleUrls: ['./accion.page.scss'],
})
export class AccionPage implements OnInit {

  public nombre = '';

  actividad: Actividad;
  categoria: Categoria;

  constructor(
    private activatedRoute: ActivatedRoute,
    public datos: DatosService
  ) {
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.cargarDatos();
  }

  ngOnInit() {

  }

  async cargarDatos() {
    await this.datos.cargarVariables();
    this.actividad = await this.datos.actividades.find( act => act.nombre === this.nombre );
    this.categoria = await this.datos.categorias.find( cat => cat._id === this.actividad.categoria );
    if( this.categoria.valor === 'positivo' ){
      this.categoria.signo = '+';
    } else {
      this.categoria.signo = '-';
    }
    console.log(this.actividad);
  }



}
