export interface Staff {
    _id?: string;
    nombre?: string;
    email?: string;
    password?: string;
    jerarquia?: string;
    estado?: string;
    data?: Date;
}

export interface RespuestaEquipo {
  ok: boolean;
  equipos: Equipo[];
}

export interface Equipo {
  _id?: string;
  nombre: string;
  color: string;
  contraste: string;
  logo: string;
  data?: string;
}

export interface RespuestaCategoria {
  ok: boolean;
  categorias: Categoria[];
}

export interface Categoria {
  _id?: string;
  nombre: string;
  icono: string;
  valor: string;
  color: string;
  data: string;
  signo?: string;
}

export interface RespuestaAcampante {
  ok: boolean;
  acampantes: Acampante[];
}

export interface Acampante {
  _id?: string;
  nombres: string;
  observaciones: string;
  equipo: string;
  numero: string;
  foto: string;
  jerarquia: string;
  data: string;
}

export interface RespuestaAccion {
  ok: boolean;
  acciones: Accion[];
}

export interface Accion {
  _id?: string;
  nombre: string;
  observaciones: string;
  equipo: string;
  numero: string;
  puntos: number;
  categoria: string;
  actividad: string;
  creador: string;
  estado?: string;
  valor: string;
  data: string;
}

export interface RespuestaActividad {
  ok: boolean;
  actividades: Actividad[];
}

export interface Actividad {
  _id?: string;
  participantes: string[];
  nombre: string;
  observaciones: string;
  categoria: string;
  puntos: number;
  estado: string;
  creador: string;
  posEquipo?: number[];
  orden?: number;
  data: Date;
}