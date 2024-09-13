import { computed, Injectable, signal } from '@angular/core';
import {  Solicitud } from '@interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class SurtidoService {

 private solicitudPorSurtir= signal<Solicitud | null>(null);

  constructor() { }

  setSolicitudPorSurtir(solicitud: Solicitud) {
    this.solicitudPorSurtir.set(solicitud);
  }

  SolicitudPorSurtir = computed(() => this.solicitudPorSurtir());  

  existeSolicitudPorSurtir = computed(() => this.solicitudPorSurtir() !== null);
}
