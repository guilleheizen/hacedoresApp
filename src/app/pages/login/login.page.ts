import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';


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
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async login( fLogin: NgForm ) {
    if ( fLogin.invalid ) { return; }
    const valido = await this.log.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
        // navegar al tabs
        this.navCtrl.navigateRoot( '/main/acciones', { animated: true } );
    } else {
        // mostrar alerta de usuario y contraseña no correctos
        // this.alerta.showToast('Login no válido');
    }
  }
}
