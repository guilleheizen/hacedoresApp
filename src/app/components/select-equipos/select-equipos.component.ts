import { Component, OnInit, Input } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { Actividad } from '../../pages/interfaces/interfaces';
import { ModalController, NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { ValidadorService } from '../../services/validador.service';

@Component({
  selector: 'app-select-equipos',
  templateUrl: './select-equipos.component.html',
  styleUrls: ['./select-equipos.component.scss'],
})
export class SelectEquiposComponent implements OnInit {

  @Input() actividad: Actividad;

  constructor(
    public datos: DatosService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private stor: StorageService,
    private val: ValidadorService
  ) { }

  ngOnInit() {
  }

  selectEquipo( id: string ) {

    const hay = this.actividad.participantes.indexOf( id );

    if (hay !== -1 && this.actividad.participantes.length === 2){
      this.val.presentToast('Debe haber por lo menos 2 equipos');
    } else {
      if ( hay === -1 ) {
        this.actividad.participantes.push(id);
      } else {
        this.actividad.participantes.splice( hay, 1 );
      }
    }
  }

  confirmar() {
    this.stor.actualizarActividad(this.actividad);
    this.close();
    this.navCtrl.navigateForward('main/accion/' +  encodeURI(this.actividad.nombre), {animated: true} );
  }
  async close() {
    await this.modalCtrl.dismiss();
  }
}
