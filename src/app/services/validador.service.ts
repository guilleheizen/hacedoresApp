import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actividad } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor( public toastController: ToastController  ) { }


  async presentToast( mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 800,
      position: 'bottom'
    });
    toast.present();
  }

  validarActividad( actividad: Actividad ) {
    if ( actividad.nombre.length < 4 ) {
      this.presentToast('Ingrese un Nombre válido');
      return false;
    }
    if ( actividad.observaciones.length < 4 ) {
      this.presentToast('Ingrese una Observación válida');
      return false;
    }
    if ( actividad.participantes.length === 1 ) {
      this.presentToast('Seleccione al menos 2 participantes');
      return false;
    }
    return true;
  }

}
