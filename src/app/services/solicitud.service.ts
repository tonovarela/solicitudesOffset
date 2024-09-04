import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {  OPS } from '../data/data';
import { delay, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
   


  httpClient = inject(HttpClient);
  constructor() { }

  obtenerSolicitudes() {
   // return obtenerSolicitudes();
  }

  buscarOP(patron:string){
    return of(OPS.filter(op => op.OP.toLowerCase().includes(patron.toLowerCase()))).pipe(delay(500));

  }

}
