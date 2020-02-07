import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NavController } from '@ionic/angular';
import { DatosService } from '../../services/datos.service';
import { Actividad, Accion } from 'src/app/interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { LoadingController } from '@ionic/angular';
import { ValidadorService } from '../../services/validador.service';

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
    public loadingController: LoadingController,
    private val: ValidadorService,
  ) { }

  ngOnInit() {}

  async cerrarSesion() {
    await this.sincronizar();
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
        const actualizado = this.datos.syncAccion( acc, estado );
        if ( !actualizado ) {
          this.val.presentToast('Error al sincronizar');
          return false;
        }
      }
    });

    const actividades = this.datos.actividades;

    await actividades.forEach(  ( act: Actividad ) => {
      const estado = 'ACTIVA';

      if (act.estado === 'NUEVA' || act.estado === 'ACTUALIZADA') {

        const actualizado = this.datos.syncActividad( act, estado );

        if ( !actualizado ) {
          this.val.presentToast('Error al sincronizar');
          return false;
        }
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
