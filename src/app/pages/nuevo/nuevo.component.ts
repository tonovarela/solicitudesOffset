import { Component, inject, OnDestroy, signal } from '@angular/core';
import { debounceTime, from, Subject, switchMap } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent  implements OnDestroy {





  

  public valorQuery: string = "";
  public selectedOP  :any | null = null;
  private valorQuerySubject: Subject<string> = new Subject<string>();
  private solicitudService= inject(SolicitudService);
  cargandoBusqueda= signal(false);
  OPsBusqueda = signal<any[]>([]);

  constructor() {
    
    this.valorQuerySubject.pipe(    
      switchMap(query => { return this.solicitudService.buscarOP(query)})
    ).subscribe((ops)=>{
      this.cargandoBusqueda.set(false);
      this.OPsBusqueda.set(ops);      
    })    
  }
  ngOnDestroy(): void {
    this.valorQuerySubject.unsubscribe();
  }
  OnQueryChanged() {        
    this.OPsBusqueda.set([]);
    if (this.valorQuery.length < 3) {
      return;
    }
    this.cargandoBusqueda.set(true);
    this.valorQuerySubject.next(this.valorQuery);    

  }

  onSelect({value}: any) {
    this.selectedOP = value;
    this.valorQuery = "";
  }
  closeDetail() {
    this.selectedOP = null; // Cierra el detalle de la OP
  }
}
