import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Maquina, Solicitud } from '../interfaces/solicitud.interface';
import { environment } from '@env/environment.development';
import { ResponseBuscarOrden, ResponseListadoSolicitud, ResponseListarMaquinas, ResponseObtenerSurtido } from '@interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  httpClient = inject(HttpClient);

  private _solicitudes = signal<Solicitud[]>([]);
  private readonly URL = environment.apiUrl;
  solicitudes = computed(() => this._solicitudes()  );
  _maquinas = signal<Maquina[]>([]);

  constructor() {
    this.cargarSolicitudes();
    this.httpClient.get<ResponseListarMaquinas>(this.URL + '/api/maquinas').subscribe(({maquinas})=>this._maquinas.set(maquinas))
  }

  maquinas= computed  (() => this._maquinas() );  
  cargarSolicitudes(pendientes: boolean = false) {     
    this.httpClient.get<ResponseListadoSolicitud>(`${this.URL}/api/solicitud?pendientes=${pendientes}`).subscribe(({solicitudes})=>this._solicitudes.set(solicitudes));       
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

  

}
