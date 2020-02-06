import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private login: LoginService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then( async () => {
      await this.login.cargarCredenciales();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
