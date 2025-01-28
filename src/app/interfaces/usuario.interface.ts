export interface Usuario {
    id:string;
    personal:string;
    nombre:string;
    rol:Rol

}

export enum Rol {
    ADMINISTRADOR="1" ,
    SOLICITANTE="2",    
    ALMACENISTA="3",        
}
export enum StatusLogin {
    INITIAL,    
    PROCESSING,
    LOGGED,
    LOGOUT,
    ERROR,
    
}