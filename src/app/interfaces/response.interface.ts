import { Firma, Maquina, MotivoCancelacion, Orden, Solicitud } from "./solicitud.interface";
import { Rol } from "./usuario.interface";

interface Response {
    ok: boolean
}

export interface ResponseBuscarOrden extends Response {
    ordenes: Orden[]
}

export interface ResponseListarMaquinas extends Response {
    maquinas: Maquina[]
}
export interface ResponseMotivoCancelacion extends Response {
    motivos: MotivoCancelacion[]
}

export interface ResponseObtenerSurtido extends Response {
    cantidad: number;
}
export interface ResponseListadoSolicitud extends Response {
    solicitudes: Solicitud[];
}

export interface ResponseFirmasSurtido extends Response {
    firmas: Firma[]
}



export interface ResponseAuth extends Response {
    mensaje: string;
    usuario: UsuarioResponse;
}

export interface UsuarioResponse {
    rol: Rol;
    id: string;
    personal: string;
    nombre: string;
    login: string;
}
