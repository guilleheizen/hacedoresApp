import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { Accion } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { VerAccionComponent } from 'src/app/components/ver-accion/ver-accion.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-eventos',
  templateUrl: 'eventos.page.html',
  styleUrls: ['eventos.page.scss']
})
export class EventosPage implements OnInit{

  private acciones: Accion[] = [];
  
  constructor(
    public datos: DatosService,
    private modalController: ModalController,
    public st: LoginService,
  ) {}

  ngOnInit() {
    this.datos.cargarVariables();
    setTimeout(() => {
      this.acciones = this.datos.cargarAcciones().filter(ac => ac.creador === this.st.staff._id);
    }, 1000);
    
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

