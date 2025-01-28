export interface Solicitud {
    id_solicitud: number;
    op: string;
    descripcion: string;
    solicitante: string;
    id_solicitante: number;
    cantidadSurtida: number;
    id_estado: number;
    estado: string;
    componente: string;
    cantidad: number;
    id_maquina:string;
    maquina: string;    
    comentarios: string;
    fecha_registro: Date;
    fecha_entrega: Date;
    motivoCancelacion?: string;
    puedeEditar?: boolean;
}


export interface MotivoCancelacion {
    id: number;
    descripcion: string;
}

export interface Orden {
    op:string,
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

export interface ColumnSolicitud extends Solicitud {
    column: any,
    index: string
  }


  export interface PropsSurtido {
    id_solicitud: number;
    firma: string;
    id_usuario: string;
    cantidad: number;
  }

  export interface Firma {
    id: number;    
    usuario: string;
    personal: string;
    fecha_registro: Date;
    firma: string;
    cantidad: number;   

  }