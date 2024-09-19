import { computed, inject, Injectable, signal } from '@angular/core';
import {  Solicitud } from '@interfaces/solicitud.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.development';
import { PropsSurtido } from '../interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class SurtidoService {

 private solicitudPorSurtir= signal<Solicitud | null>(null);

 private httpClient = inject(HttpClient);
 private readonly URL = environment.apiUrl;
 
  constructor() { }

  setSolicitudPorSurtir(solicitud: Solicitud) {    
    this.solicitudPorSurtir.set(solicitud);
  }

  SolicitudPorSurtir = computed(() => this.solicitudPorSurtir());  

  existeSolicitudPorSurtir = computed(() => this.solicitudPorSurtir() !== null);


  registrar(surtido:PropsSurtido){
    return  this.httpClient.post(`${this.URL}/api/solicitud/surtir`, { surtido})

  }
}
