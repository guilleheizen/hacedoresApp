
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DatosService } from '../../services/datos.service';
import { ModalController } from '@ionic/angular';
import { BuscarComponent } from '../../components/buscar/buscar.component';
import { Categoria } from '../interfaces/interfaces';


@Component({
  selector: 'app-acciones',
  templateUrl: 'acciones.page.html',
  styleUrls: ['acciones.page.scss']
})
export class AccionesPage implements OnInit {

  constructor(
    public st: LoginService,
    public datos: DatosService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.datos.cargarVariables();
  }

  async presentModal(categoria: Categoria) {

    const modal = await this.modalController.create({
      component: BuscarComponent,
      componentProps: {
        categoria
      }
    });
    return await modal.present();
  }
}
