export const data: Object[] = [
    {
        OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
        ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',

    },
    {
        OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
        ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',

    },
    {
        OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, OrderDate: new Date(8367642e5),
        ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',

    },
];


export const obtenerSolicitudes = () => {
    const solicitudes = [];
    for (let i = 1; i <= 500; i++) {
        solicitudes.push({
            id: i,
            OP: `OP ${i}`,
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


export const OPS =[
    {
        OP:'L35466',
        componente:'Componente 1',
        cantidad: 10,
        descripcion: 'Descripcion del OP 1',
    },
    {
        OP:'L35465',
        componente:'Componente 2',
        cantidad: 4,
        descripcion: 'Descripcion del OP 1',
    },
    {
        OP:'L35464',
        componente:'Componente 3',
        cantidad: 9,
        descripcion: 'Descripcion del OP 1',
    },
    {
        OP:'L35463',
        componente:'Componente 4',
        cantidad: 15,
        descripcion: 'Descripcion del OP 1',
    }
]