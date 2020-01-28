import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { RespuestaEquipo, Equipo } from '../pages/interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { LoginService } from './login.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DatosService {

    headers: HttpHeaders;
    public equipos: Equipo[];

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private navCtrl: NavController,
        public cred: LoginService
    ) {
        this.getHeaders();
    }

    getHeaders() {
        this.headers = new HttpHeaders({
            'x-token': this.cred.token
        });
    }

    // TRAER DATOS
    getEquipos() {

        const headers = this.headers;

        this.http.get(`${ URL }/equipos/`, { headers }).subscribe( (resp: RespuestaEquipo) => {
            if ( resp.ok ) {
                this.equipos = resp.equipos;
                this.storage.set('equipos', this.equipos);
            } else {
                this.storage.clear();
                this.navCtrl.navigateForward('/login');
            }
        });

    }
}
