import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Categoria, Actividad } from '../../pages/interfaces/interfaces';
import { ModalController, NavController } from '@ionic/angular';
import { DatosService } from '../../services/datos.service';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {

  @Input() categoria: Categoria;

  @ViewChild('buscador', {static: true})  buscador;

  actividades: Actividad[];

  newActividad: Actividad = {
    participantes: [],
    nombre: '',
    observaciones: '',
    categoria: '',
    puntos: 50,
    estado: 'CREADO',
    creador: '',
    posEquipo: [],
    data: new Date()
  };

  constructor(
    private modalCtrl: ModalController,
    public datos: DatosService,
    public stor: StorageService,
    private us: LoginService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.actividades = this.datos.actividades.filter( (bsq) => bsq.categoria === this.categoria._id);
  }

  ionViewWillEnter() {
    this.datos.cargarVariables();
    setTimeout(() => {
      this.buscador.setFocus();
    }, 250);

 }

  buscar( event ) {
    const palabra = event.detail.value || '';
    this.newActividad.nombre = palabra;
    this.actividades = this.datos.actividades.filter( (bsq) => ( bsq.categoria === this.categoria._id && bsq.nombre.toLowerCase().indexOf( palabra ) > -1 ));
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  async enviar( fActividad: NgForm ) {
    this.newActividad.categoria = this.categoria._id;
    this.newActividad.creador = this.us.staff._id;
    this.stor.crearActividad( this.newActividad );
    this.datos.cargarVariables();
    this.irAccion( this.newActividad.nombre );
  }

  irAccion( nombre: string ) {
    this.navCtrl.navigateForward('main/accion/' + nombre, {animated: true} );
    this.close();
  }

  selectEquipo( posicion: number, equipo: string) {
    const hay =  this.newActividad.posEquipo.indexOf(posicion);
    if ( hay > -1 ) {
      this.newActividad.posEquipo.splice( hay, 1 );
      this.newActividad.participantes.splice( hay, 1 );
    } else {
      this.newActividad.posEquipo.push(posicion);
      this.newActividad.participantes.push(equipo);
    }
  }

}
