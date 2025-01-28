import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Maquina, MotivoCancelacion, Solicitud } from '../interfaces/solicitud.interface';
import { environment } from '@env/environment.development';
import { ResponseBuscarOrden, ResponseFirmasSurtido, ResponseListadoSolicitud, ResponseListarMaquinas, ResponseMotivoCancelacion, ResponseObtenerSurtido } from '@interfaces/response.interface';
import { tap } from 'rxjs';



export interface PropsCancelarSolicitud {
  id_solicitud: number;
  id_catMotivo: number;
  motivo: string;
  id_usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  httpClient = inject(HttpClient);

  private _solicitudes = signal<Solicitud[]>([]);
  private readonly URL = environment.apiUrl;
  solicitudes = computed(() => this._solicitudes());
  cargandoSolicitudes = computed(() => this._cargandoSolicitudes());
  private _cargandoSolicitudes = signal(false);
  private _maquinas = signal<Maquina[]>([]);
  private _motivosCancelacion = signal<MotivoCancelacion[]>([]);

  constructor() {
    this.cargarMaquinas();
    this.cargarMotivosCancelacion();  
  }

  motivosCancelacion = computed(() => this._motivosCancelacion());

  maquinas = computed(() => this._maquinas());
  cargarSolicitudes(id_usuario:string,pendientes: boolean = false) {    
    this.httpClient.get<ResponseListadoSolicitud>(`${this.URL}/api/solicitud?pendientes=${pendientes}`)
      .pipe(tap(() => this._cargandoSolicitudes.set(true)))
      .subscribe(({ solicitudes }) => {
        const _solicitudes = solicitudes.map(solicitud => {
          return  {...solicitud, puedeEditar: solicitud.id_solicitante.toString() === id_usuario}});
        this._solicitudes.set(_solicitudes)
        this._cargandoSolicitudes.set(false);
      });
  }

  cargarMaquinas() {
    this.httpClient.get<ResponseListarMaquinas>(this.URL + '/api/maquinas').subscribe(({ maquinas }) => this._maquinas.set(maquinas))
  }

  cargarMotivosCancelacion() {
    this.httpClient.get<ResponseMotivoCancelacion>(this.URL + '/api/motivos')
      .subscribe(({ motivos }) => this._motivosCancelacion.set(motivos));
  }

  agregarSolicitud(solicitud: any) {
    return this.httpClient.post(this.URL + '/api/solicitud', { solicitud });
  }


  buscarOP(patron: string) {
    return this.httpClient.post<ResponseBuscarOrden>(`${this.URL}/api/orden/buscar`, { patron: patron });
  }

  obtenerSurtido(op: string, componente: string) {
    return this.httpClient.get<ResponseObtenerSurtido>(`${this.URL}/api/surtido/op/${op}/componente/${componente}`);
  }


  
  cancelarSolicitud({id_solicitud,id_catMotivo,motivo,id_usuario,}:PropsCancelarSolicitud) {
    return this.httpClient.put(this.URL + '/api/solicitud/cancelar', { cancelacion: { id_solicitud,id_catMotivo, motivo, id_usuario } });
  }

  obtenerFirmasSurtido(id_solicitud: number) {
    return this.httpClient.get<ResponseFirmasSurtido>(`${this.URL}/api/surtido/${id_solicitud}/firmas`);
  }

  actualizarFechaEntrega({ id_solicitud, fecha_entrega,id_usuario }: { id_solicitud: number, fecha_entrega: string,id_usuario:string }) {
    return this.httpClient.put(this.URL + '/api/solicitud/fecha-entrega', { id_solicitud, fecha_entrega, id_usuario });
  }





}
