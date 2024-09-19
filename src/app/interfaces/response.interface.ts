import { Firma, Maquina, Orden, Solicitud } from "./solicitud.interface";

interface Response {
    ok:boolean
}

export interface ResponseBuscarOrden   extends Response {    
    ordenes:Orden[]
}

export interface ResponseListarMaquinas  extends Response {
    maquinas :Maquina[]
}

export interface ResponseObtenerSurtido extends Response {
    cantidad: number;
}
export interface ResponseListadoSolicitud extends Response {
    solicitudes: Solicitud[];
}

export interface ResponseFirmasSurtido extends Response {
    firmas:Firma[]
}