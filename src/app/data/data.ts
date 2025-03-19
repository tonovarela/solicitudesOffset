
import { Solicitud } from "@interfaces/solicitud.interface";
export const solicitudVacia :Solicitud ={
    id_solicitud: 0,
    op: '',
    descripcion: '',
    solicitante: '',
    id_solicitante: 0,
    cantidadSurtida: 0,
    id_estado: 1,
    estado: '',
    componente: '',
    cantidad: 0,
    id_maquina: '',
    maquina: '',
    comentarios: '',
    fecha_registro: new Date(),
    fecha_entrega: new Date()
  };