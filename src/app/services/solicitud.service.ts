import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { OPS } from '../data/data';
import { delay, of, tap } from 'rxjs';
import { Solicitud } from '../interfaces/solicitud.interface';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  httpClient = inject(HttpClient);

  private _solicitudes = signal<Solicitud[]>([]);
  solicitudes = computed(() => this._solicitudes()  );

  constructor() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    const solicitudes = [];
    for (let i = 1; i <= 5; i++) {
      solicitudes.push({
        id: i,
        op: `OP ${i}`,
        solicita: `Solicitante ${i}`,
        id_solicitate: i,
        id_estado: i % 3 + 1, // Alterna entre 1, 2 y 3
        estado: ['Por surtir', 'Cerrado', 'Cancelado'][i % 3],
        componente: `Componente ${i}`,
        cantidad: Math.floor(Math.random() * 100) + 1, // Cantidad aleatoria entre 1 y 100
        id_maquina: `${i % 5 + 1}`, // Alterna entre 1 y 5
        maquina: `Maquina ${i % 5 + 1}`,
        comentarios: `Comentarios ${i}`,
        fecha_registro: new Date(8364186e5 + i * 86400000), // Incrementa la fecha por día
        fecha_entrega: new Date(8364186e5 + i * 86400000 + 86400000 * 7), // Incrementa la fecha por una semana
      });
    }
    this._solicitudes.set(solicitudes);

  }

  agregarSolicitud(solicitud: any) {
    return of({ ok: true }).pipe(
      tap(() => {
        this._solicitudes.set([...this._solicitudes(), solicitud]);
      }),
      delay(500)
    );

  }


  buscarOP(patron: string) {
    return of(OPS.filter(op => op.op.toLowerCase().includes(patron.toLowerCase()))).pipe(delay(500));

  }

}
