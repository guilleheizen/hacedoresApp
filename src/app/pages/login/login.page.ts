import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { DatosService } from '../../services/datos.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email: 'guilleheizen@gmail.com',
    password: 'olakase'
};

  constructor(
    private log: LoginService,
    private navCtrl: NavController,
    private datos: DatosService
  ) { }

  ngOnInit() {
  }

  async login( fLogin: NgForm ) {
    if ( fLogin.invalid ) { return; }
    const valido = await this.log.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
        this.datos.getHeaders();
        // navegar al tabs
        this.datos.getEquipos();
        this.datos.getAcampantes();
        this.datos.getCategorias();
        this.datos.getActividades();
        this.datos.getAcciones();

        this.navCtrl.navigateRoot( '/main/acciones', { animated: true } );
    } else {
        // mostrar alerta de usuario y contraseña no correctos
        // this.alerta.showToast('Login no válido');
    }
  }
}
