import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Equipo, Categoria, Accion, Actividad, Acampante, RespuestaEquipo, RespuestaCategoria, RespuestaAccion, RespuestaActividad, RespuestaAcampante } from '../pages/interfaces/interfaces';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    public equipos: Equipo[];
    public acampantes: Acampante[];
    public categorias: Categoria[];
    public actividades: Actividad[];
    public acciones: Accion[];

    constructor(
        private storage: Storage,
        public cred: LoginService
    ) {}

    // ABM DATOS

    async crearActividad( actividad: Actividad ) {
      this.actividades = await this.storage.get('actividades');
      const existe = this.actividades.find( act => act === actividad );

      if ( !existe ) {
        // AGREGAR
        this.actividades.unshift(actividad);
        this.storage.set('actividades', this.actividades);
        // Enviar a esa actividad
      } else {
        console.log('Ya ha sido agregado');
        // Toast - enviar a esa actividad
      }
    }

    async actualizarActividad( actividad: Actividad ) {
      this.actividades = await this.storage.get('actividades');
      const existe = this.actividades.find( act => act._id === actividad._id );

      if ( !existe ) {
        // AGREGAR
        this.actividades.unshift(actividad);
        this.storage.set('actividades', this.actividades);
        // Enviar a esa actividad
      } else {
        this.actividades = this.actividades.filter(act => act._id !== actividad._id );
        this.actividades.unshift(actividad);
        this.storage.set('actividades', this.actividades);
        // Toast - enviar a esa actividad
      }
    }

}
