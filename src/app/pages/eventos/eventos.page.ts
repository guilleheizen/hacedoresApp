import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { Accion } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { VerAccionComponent } from 'src/app/components/ver-accion/ver-accion.component';

@Component({
  selector: 'app-eventos',
  templateUrl: 'eventos.page.html',
  styleUrls: ['eventos.page.scss']
})
export class EventosPage implements OnInit{

  constructor(
    public datos: DatosService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.datos.cargarVariables();
  }

  async presentModal(accion: Accion) {

    const modal = await this.modalController.create({
      component: VerAccionComponent,
      cssClass: 'dialog-modal2',
      componentProps: {
        accion
      }
    });
    return await modal.present();
  }
}

