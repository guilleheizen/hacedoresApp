import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NavController } from '@ionic/angular';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    public st: LoginService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {}

  cerrarSesion() {
    this.st.logOut();
    this.navCtrl.navigateRoot('/login');
  }

}
