import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Staff } from '../pages/interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = null;
  public staff: Staff = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
  ) { }


  login( email: string, password: string ) {
    const data = { email, password };
    return new Promise( resolve => {
      this.http.post(`${ URL }/staff/login`, data ).subscribe( async (resp: any) => {
        if ( resp.ok ) {
          await this.guardarToken( resp.token );
          await this.guardarCredenciales( resp.staff );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async guardarCredenciales( staff: Staff ) {
    this.staff = staff;
    await this.storage.set('staff', staff);
  }

  async validarCredenciales(): Promise<boolean> {
    await this.cargarCredenciales();
    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    } else {
      return Promise.resolve(true);
    }
  }

  async cargarCredenciales() {
    this.token = await this.storage.get('token') || null;
    this.staff = await this.storage.get('staff') || {};
  }

}
