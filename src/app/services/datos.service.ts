import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Equipo, Categoria, Accion, Actividad, Acampante, RespuestaEquipo, RespuestaCategoria, RespuestaAccion, RespuestaActividad, RespuestaAcampante, Staff } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { LoginService } from './login.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DatosService {

    headers: HttpHeaders;

    public equipos: Equipo[] = [];
    // public acampantes: Acampante[] = [];
    public categorias: Categoria[] = [];
    public actividades: Actividad[] = [];
    public acciones: Accion[] = [];
    public eliminadas: Accion[] = [];
    public staff: Staff;

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private navCtrl: NavController,
        public cred: LoginService
    ) {
        this.cargarVariables();
        this.getHeaders();
    }

    getHeaders() {
        this.headers = new HttpHeaders({
            'x-token': this.cred.token
        });
    }

    // TRAER DATOS
    async getEquipos() {

        const headers = this.headers;

        await this.http.get(`${ URL }/equipos/`, { headers }).subscribe( (resp: RespuestaEquipo) => {
            if ( resp.ok ) {
                this.equipos = resp.equipos;
                this.storage.set('equipos', this.equipos);
            } else {
                this.logOut();
                this.navCtrl.navigateForward('/login');
            }
        });

    }

    // async getAcampantes() {

    //     const headers = this.headers;

    //     await this.http.get(`${ URL }/acampantes/`, { headers }).subscribe( (resp: RespuestaAcampante) => {
    //         if ( resp.ok ) {
    //             this.acampantes = resp.acampantes;
    //             this.storage.set('acampantes', this.acampantes);
    //         } else {
    //             this.logOut();
    //             this.navCtrl.navigateForward('/login');
    //         }
    //     });

    // }

    async getCategorias() {

        const headers = this.headers;

        await this.http.get(`${ URL }/categorias/`, { headers }).subscribe( (resp: RespuestaCategoria) => {
            if ( resp.ok ) {
                this.categorias = resp.categorias;
                this.storage.set('categorias', this.categorias);
            } else {
                this.logOut();
                this.navCtrl.navigateForward('/login');
            }
        });

    }

    async getActividades() {

        const headers = this.headers;

        await this.http.get(`${ URL }/actividades/`, { headers }).subscribe( (resp: RespuestaActividad) => {

            if ( resp.ok ) {

                const actividades = resp.actividades;
                const noActualizadas = ( this.actividades ) ? this.actividades.filter( bsq => (bsq.estado === 'NUEVA') ) : [];

                actividades.unshift(...noActualizadas);
                this.actividades = actividades;
                this.storage.set('actividades', this.actividades);
            } else {
                this.logOut();
                this.navCtrl.navigateForward('/login');
            }
        });

    }


    async syncActividad( actividad: Actividad, estado: string ) {

        actividad.estado = estado;
        const headers = this.headers;
        return new Promise( resolve => {
            this.http.post(`${ URL }/actividades/add/`, actividad, { headers }).subscribe( (resp: RespuestaActividad) => {
                console.log(resp);
                if ( resp.ok ) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    async syncAccion( accion: Accion, estado: string ) {

        accion.estado = estado;
        const headers = this.headers;
        return new Promise( resolve => {
            this.http.post(`${ URL }/acciones/add/`, accion, { headers }).subscribe( (resp: RespuestaAccion) => {
                console.log(resp);
                if ( resp.ok ) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    async getAcciones() {

        const headers = this.headers;

        await this.http.get(`${ URL }/acciones/`, { headers }).subscribe( (resp: RespuestaAccion) => {
            if ( resp.ok ) {

                const acciones = resp.acciones;

                const viejas = this.eliminadas.filter( bsq => (bsq.estado === 'NUEVA' || bsq.estado === 'ELIMINADA' ) );
                acciones.unshift(...viejas);
                this.eliminadas = acciones;
                this.acciones = acciones.filter( (bsq) => bsq.estado !== 'ELIMINADA' &&  bsq.estado !== 'ACTUALIZADA-ELIMINADA');
                this.storage.set('acciones', this.eliminadas);
            } else {
                this.logOut();
                this.navCtrl.navigateForward('/login');
            }
        });

    }

    async cargarVariables() {
        this.equipos = await this.storage.get('equipos');
        // this.acampantes = await this.storage.get('acampantes');
        this.categorias = await this.storage.get('categorias');
        this.actividades = await this.storage.get('actividades');
        const accioness = await this.storage.get('acciones');
        if ( accioness ) {
            this.eliminadas = accioness;
            this.acciones = await accioness.filter( (bsq) => bsq.estado !== 'ELIMINADA' && bsq.estado !== 'ACTUALIZADA-ELIMINADA' );
        }
        this.staff = await this.storage.get('staff');
    }

    async sincronizarDatos() {
        return true;
    }

    logOut() {
        this.storage.remove('staff');
        this.storage.remove('login');
    }

    async getInformation() {

        this.getHeaders();
        // navegar al tabs
        await this.getEquipos();
        // await this.getAcampantes();
        await this.getCategorias();
        await this.getActividades();
        await this.getAcciones();

    }
}
