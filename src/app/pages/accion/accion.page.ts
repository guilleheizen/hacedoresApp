import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosService } from '../../services/datos.service';
import { Actividad, Categoria, Accion } from '../../interfaces/interfaces';
import { Platform, NavController } from '@ionic/angular';
import { ValidadorService } from '../../services/validador.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.page.html',
  styleUrls: ['./accion.page.scss'],
})
export class AccionPage implements OnInit {

  public nombre = '';

  newAccion = {
    titulo: '',
    observacion: ''
  };

  @ViewChild('nom', {  static: false })  nom;

  actividad: Actividad;
  categoria: Categoria;

  constructor(
    private activatedRoute: ActivatedRoute,
    public datos: DatosService,
    public platform: Platform,
    public navCtrl: NavController,
    private al: ValidadorService,
    private stor: StorageService
  ) {}


  ngOnInit() {
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
  }

  ionViewWillEnter() {
    this.cargarDatos();
    setTimeout(() => {
      this.nom.setFocus();
    }, 350);
  }


  async cargarDatos() {
    await this.datos.cargarVariables();
    this.actividad = await this.datos.actividades.find( act => act.nombre === this.nombre );
    this.categoria = await this.datos.categorias.find( cat => cat._id === this.actividad.categoria );
    if ( this.categoria.valor === 'positivo' ) {
      this.categoria.signo = '+';
    } else {
      this.categoria.signo = '-';
    }
    this.newAccion.titulo = this.actividad.nombre+' - ';
  }

  selectEquipo(id: string) {
    // Validar
    if (this.newAccion.titulo.length < 3) {
      this.nom.setFocus();
      this.al.presentToast('Nombre Requerido');
      return false;
    }

    if (this.newAccion.observacion.length < 3) {
      this.nom.setFocus();
      this.al.presentToast('Observaciones Requeridas');
      return false;
    }

    const accion: Accion = {
      _id: '',
      nombre: this.newAccion.titulo,
      observaciones: this.newAccion.observacion,
      equipo: id,
      numero: '',
      puntos: this.actividad.puntos,
      categoria: this.categoria._id,
      actividad: this.actividad.nombre,
      participantes: this.actividad.participantes,
      creador: this.datos.staff._id,
      estado: 'CREADA',
      valor: this.categoria.valor,
      data: new Date().toString()
    };

    this.stor.crearAccion(accion);
    this.al.presentToast('Registrado correctamente');
    this.navCtrl.navigateBack('main/acciones', {animated: true});
    this.newAccion.titulo = '';
    this.newAccion.observacion = '';
  }



}
