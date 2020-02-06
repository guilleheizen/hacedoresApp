import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NavController } from '@ionic/angular';
import { DatosService } from '../../services/datos.service';
import { Actividad, Accion } from 'src/app/interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    public st: LoginService,
    private navCtrl: NavController,
    private datos: DatosService,
    private stor: StorageService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {}

  cerrarSesion() {
    this.st.logOut();
    this.navCtrl.navigateRoot('/login');
  }

  async sincronizar() {
    this.presentLoading();
    const eliminadas = this.datos.eliminadas;

    await eliminadas.forEach( ( acc: Accion ) => {
      let estado = 'ACTUALIZADA';

      if (acc.estado === 'NUEVA' || acc.estado === 'ELIMINADA') {
        if ( acc.estado === 'ELIMINADA') {
          estado = 'ACTUALIZADA-ELIMINADA';
        }
        this.datos.syncAccion( acc, estado );
      }
    });
    const actividades = this.datos.actividades;
    await actividades.forEach(  ( act: Actividad ) => {
      const estado = 'ACTIVA';

      if (act.estado === 'NUEVA' || act.estado === 'ACTUALIZADA') {
        this.datos.syncActividad( act, estado );
      }
    });
    await this.stor.limpiarAA();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Sincronizando',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
