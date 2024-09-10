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

  public options = [{id:1,descripcion:'Maquina 1'},{id:2,descripcion:'Maquina 2'},{id:3,descripcion:'Maquina 3'}];
  public selectedOP  :any | null = {
    OP:'L35466',
    componente:'Componente 1',
    cantidad: 10,
    descripcion: 'Descripcion del OP 1',
};
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
