import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Equipo, Categoria, Sancion, Accion, Actividad, Acampante, RespuestaEquipo, RespuestaCategoria, RespuestaSancion, RespuestaAccion, RespuestaActividad, RespuestaAcampante } from '../pages/interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { LoginService } from './login.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DatosService {

    headers: HttpHeaders;

    public equipos: Equipo[];
    public acampantes: Acampante[];
    public categorias: Categoria[];
    public sanciones: Sancion[];
    public actividades: Actividad[];
    public acciones: Accion[];

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

    getAcampantes() {

        const headers = this.headers;

        this.http.get(`${ URL }/acampantes/`, { headers }).subscribe( (resp: RespuestaAcampante) => {
            if ( resp.ok ) {
                this.acampantes = resp.acampantes;
                this.storage.set('acampantes', this.acampantes);
            } else {
                this.storage.clear();
                this.navCtrl.navigateForward('/login');
            }
        });

    }

    getCategorias() {

        const headers = this.headers;

        this.http.get(`${ URL }/categorias/`, { headers }).subscribe( (resp: RespuestaCategoria) => {
            if ( resp.ok ) {
                this.categorias = resp.categorias;
                this.storage.set('categorias', this.categorias);
            } else {
                this.storage.clear();
                this.navCtrl.navigateForward('/login');
            }
        });

    }

    getSanciones() {

        const headers = this.headers;

        this.http.get(`${ URL }/sanciones/`, { headers }).subscribe( (resp: RespuestaSancion) => {
            if ( resp.ok ) {
                this.sanciones = resp.sanciones;
                this.storage.set('sanciones', this.sanciones);
            } else {
                this.storage.clear();
                this.navCtrl.navigateForward('/login');
            }
        });

    }

    getActividades() {

        const headers = this.headers;

        this.http.get(`${ URL }/actividades/`, { headers }).subscribe( (resp: RespuestaActividad) => {
            if ( resp.ok ) {
                this.actividades = resp.actividades;
                this.storage.set('actividades', this.actividades);
            } else {
                this.storage.clear();
                this.navCtrl.navigateForward('/login');
            }
        });

    }

    getAcciones() {

        const headers = this.headers;

        this.http.get(`${ URL }/acciones/`, { headers }).subscribe( (resp: RespuestaAccion) => {
            if ( resp.ok ) {
                this.acciones = resp.acciones;
                this.storage.set('acciones', this.acciones);
            } else {
                this.storage.clear();
                this.navCtrl.navigateForward('/login');
            }
        });

    }
}
