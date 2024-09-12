import { Maquina, Orden } from "../interfaces/solicitud.interface";


export const obtenerSolicitudes = () => {
    const solicitudes = [];
    for (let i = 1; i <= 500; i++) {
        solicitudes.push({
            id: i,
            op: `OP ${i}`,
            solicita: `Solicitante ${i}`,
            id_solicitate: i,
            id_estado: i % 3 + 1, // Alterna entre 1, 2 y 3
            estado: ['Por surtir', 'Cerrado', 'Cancelado'][i % 3],
            componente: `Componente ${i}`,
            cantidad: Math.floor(Math.random() * 100) + 1, // Cantidad aleatoria entre 1 y 100
            id_maquina: i % 5 + 1, // Alterna entre 1 y 5
            maquina: `Maquina ${i % 5 + 1}`,
            comentarios: `Comentarios ${i}`,
            fecha_registro: new Date(8364186e5 + i * 86400000), // Incrementa la fecha por día
            fecha_entrega: new Date(8364186e5 + i * 86400000 + 86400000 * 7), // Incrementa la fecha por una semana
        });
    }
    return solicitudes;
}


export const OPS:Orden[] =[
    {
        op:'L35466',
        componente:'Componente 1',
        cantidad: 10,
        descripcion: 'Descripcion del op 1',
        cantidadSurtida:5,
        porSurtir: 0
    },
    {
        op:'L35465',
        componente:'Componente 2',
        cantidad: 4,
        descripcion: 'Descripcion del op 1',
        cantidadSurtida:2,
        porSurtir: 0

    },
    {
        op:'L35464',
        componente:'Componente 3',
        cantidad: 9,
        descripcion: 'Descripcion del op 1',
        cantidadSurtida:5,
        porSurtir: 0
    },
    {
        op:'L35463',
        componente:'Componente 4',
        cantidad: 15,
        descripcion: 'Descripcion del OP 1',
        cantidadSurtida:7,
        porSurtir: 0
    }
]


export const maquinas:Maquina[] = [
    {id:"1",descripcion:"Maquina 1"},
    {id:"2",descripcion:"Maquina 2"},
    {id:"3",descripcion:"Maquina 3"},
    {id:"4",descripcion:"Maquina 4"},
    {id:"5",descripcion:"Maquina 5"},
]