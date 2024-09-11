export interface Solicitud {
    id: number;
    op: string;
    solicita: string;
    id_solicitate: number;
    id_estado: number;
    estado: string;
    componente: string;
    cantidad: number;
    id_maquina:string;
    maquina: string;
    comentarios: string;
    fecha_registro: Date;
    fecha_entrega: Date;
}

export interface Orden {
    OP:string,
    componente:string,
    cantidad: number,
    descripcion: string,
    cantidadSurtida: number,
    porSurtir: number
}

export interface Maquina {
    id: string;
    descripcion: string;
}