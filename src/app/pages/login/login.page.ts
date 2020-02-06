import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { DatosService } from '../../services/datos.service';
import { ValidadorService } from '../../services/validador.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email: '',
    password: ''
  };

  cargando = false;

  constructor(
    private log: LoginService,
    private navCtrl: NavController,
    private datos: DatosService,
    private alerta: ValidadorService
  ) { }

  ngOnInit() {
  }

  async login( fLogin: NgForm ) {
    this.cargando = true;
    if ( fLogin.invalid ) { return; }
    const valido = await this.log.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
        this.datos.getInformation();

        this.navCtrl.navigateRoot( '/main/acciones', { animated: true } );
        this.cargando = false;
    } else {
        // mostrar alerta de usuario y contraseña no correctos
        this.cargando = false;
        this.alerta.presentToast('Login no válido');
    }
  }
}
