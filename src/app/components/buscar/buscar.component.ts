import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Categoria, Actividad } from '../../pages/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {

  @Input() categoria: Categoria;
  @ViewChild('buscador', {static: true})  buscador;
  actividades: Actividad[];


  constructor(
    private modalCtrl: ModalController,
    private datos: DatosService
  ) { }

  ngOnInit() {
    this.actividades = this.datos.actividades.filter( (bsq) => bsq.categoria === this.categoria._id);
  }

  ionViewWillEnter() {

    setTimeout(() => {
      this.buscador.setFocus();
    },150);

 }

  buscar( event ) {
    const palabra = event.detail.value || '';
    this.actividades = this.datos.actividades.filter( (bsq) => ( bsq.categoria === this.categoria._id && bsq.nombre.toLowerCase().indexOf( palabra ) > -1 ));
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
