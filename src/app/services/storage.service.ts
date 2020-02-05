import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Equipo, Categoria, Accion, Actividad, Acampante, RespuestaEquipo, RespuestaCategoria, RespuestaAccion, RespuestaActividad, RespuestaAcampante } from '../pages/interfaces/interfaces';
import { LoginService } from './login.service';
import { DatosService } from './datos.service';

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
        public cred: LoginService,
        private datos: DatosService,
    ) {}

    // ABM DATOS

    async crearActividad( actividad: Actividad ) {
      actividad.estado = 'NUEVA';
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

    async crearAccion( accion: Accion ) {
      accion.estado = 'NUEVA';
      this.acciones = await this.storage.get('acciones');
      const existe = this.acciones.find( acc => acc === accion );
      if ( !existe ) {
        // AGREGAR
        this.acciones.unshift(accion);
        this.storage.set('acciones', this.acciones);
        // Enviar a esa actividad
      } else {
        console.log('Ya ha sido agregado');
        // Toast - enviar a esa actividad
      }
      this.datos.cargarVariables();
    }

    async eliminarAccion( accion: Accion ) {
      this.acciones = await this.storage.get('acciones');
      this.acciones = this.acciones.filter(acc => acc.nombre !== accion.nombre );
      accion.estado = 'ELIMINADA';
      this.acciones.push(accion);
      this.datos.cargarVariables();
      await this.storage.set('acciones', this.acciones);
    }

    async actualizarActividad( actividad: Actividad ) {

      this.actividades = await this.storage.get('actividades');
      const existe = this.actividades.find( act => act.nombre === actividad.nombre );
      actividad.estado = 'ACTUALIZADO';
      if ( !existe ) {
        // AGREGAR
        this.actividades.unshift(actividad);
        await this.storage.set('actividades', this.actividades);

        // Enviar a esa actividad
      } else {
        this.actividades = this.actividades.filter(act => act.nombre !== actividad.nombre );
        this.actividades.unshift(actividad);
        await this.storage.set('actividades', this.actividades);
        // Toast - enviar a esa actividad
      }
      this.datos.cargarVariables();
    }

}
