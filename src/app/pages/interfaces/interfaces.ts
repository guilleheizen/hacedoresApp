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

