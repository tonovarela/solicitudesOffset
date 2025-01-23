import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Maquina, Solicitud } from '../interfaces/solicitud.interface';
import { environment } from '@env/environment.development';
import { ResponseBuscarOrden, ResponseFirmasSurtido, ResponseListadoSolicitud, ResponseListarMaquinas, ResponseObtenerSurtido } from '@interfaces/response.interface';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  httpClient = inject(HttpClient);

  private _solicitudes = signal<Solicitud[]>([]);
  private readonly URL = environment.apiUrl;
  solicitudes = computed(() => this._solicitudes()  );
  cargandoSolicitudes = computed(() => this._cargandoSolicitudes());
  private _cargandoSolicitudes = signal(false);
  private _maquinas = signal<Maquina[]>([]);

  constructor() {    
    this.cargarMaquinas();
  }

  maquinas= computed  (() => this._maquinas() );  
  cargarSolicitudes(pendientes: boolean = false) {     
    console.log("cargarSolicitudes", pendientes);
    this.httpClient.get<ResponseListadoSolicitud>(`${this.URL}/api/solicitud?pendientes=${pendientes}`)
    .pipe(tap(()=>this._cargandoSolicitudes.set(true)))    
    .subscribe(({solicitudes})=>{
      this._solicitudes.set(solicitudes)
      this._cargandoSolicitudes.set(false);
    });       
   }

   cargarMaquinas() {
    this.httpClient.get<ResponseListarMaquinas>(this.URL + '/api/maquinas').subscribe(({maquinas})=>this._maquinas.set(maquinas))
   }

  agregarSolicitud(solicitud: any) {
    return this.httpClient.post(this.URL + '/api/solicitud', {solicitud});    
  }


  buscarOP(patron: string) {    
     return this.httpClient.post<ResponseBuscarOrden>(`${this.URL}/api/orden/buscar`,{patron:patron});    
  }

  obtenerSurtido(op:string,componente:string) {
    return this.httpClient.get<ResponseObtenerSurtido>(`${this.URL}/api/surtido/op/${op}/componente/${componente}`);
  }

  cancelarSolicitud(id_solicitud: number, motivo: string,id_usuario:string) {
    return this.httpClient.put(this.URL + '/api/solicitud/cancelar', { cancelacion:{id_solicitud, motivo,id_usuario}});
  }

  obtenerFirmasSurtido(id_solicitud:number) {
    return this.httpClient.get<ResponseFirmasSurtido>(`${this.URL}/api/surtido/${id_solicitud}/firmas`);
  }

  

  

}
