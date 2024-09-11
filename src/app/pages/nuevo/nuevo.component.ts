import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { firstValueFrom, Subject, switchMap } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { locale_es } from '../../conf/calendar-es';
import { Router } from '@angular/router';
import { Maquina, Orden } from '../../interfaces/solicitud.interface';
import { maquinas } from '../../data/data';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css',

})
export class NuevoComponent implements OnInit, OnDestroy {

  primeConfig = inject(PrimeNGConfig);
  private router = inject(Router);

  public guardando = signal(false);

  public valorQuery: string = "";
  public locale_es = locale_es;
  public maquinas:Maquina[] = maquinas;
  public solicitudForm = new FormGroup({
    op: new FormControl<string | null>('55'),
    cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
    id_maquina: new FormControl('', [Validators.required]),
    comentarios: new FormControl(''),
    fecha_entrega: new FormControl<Date | null>(null, [Validators.required]),
    hora_entrega: new FormControl<Date | null>(null, [Validators.required]),
  });



  public selectedOP: Orden | null = null;

  private valorQuerySubject: Subject<string> = new Subject<string>();
  private solicitudService = inject(SolicitudService);
  

  cargandoBusqueda = signal(false);
  OPsBusqueda = signal<any[]>([]);

  constructor() {

    this.valorQuerySubject.pipe(
      switchMap(query => { return this.solicitudService.buscarOP(query) })
    ).subscribe((ops) => {
      this.cargandoBusqueda.set(false);
      this.OPsBusqueda.set(ops);
    })
  }
  ngOnInit(): void {
    this.primeConfig.setTranslation(locale_es);
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

  onSelect({ value }: any) {
    this.selectedOP = value;
    this.valorQuery = "";
  }
  closeDetail() {
    this.selectedOP = null; // Cierra el detalle de la OP
  }


  tieneErrores(nombre: string) {
    return this.solicitudForm.get(nombre)!.invalid && (this.solicitudForm.get(nombre)!.dirty || this.solicitudForm.get(nombre)!.touched)
  }

  async guardarSolicitud() {
    this.solicitudForm.markAllAsTouched();
    this.solicitudForm.updateValueAndValidity();
    if (!this.solicitudForm.valid) {
      return;
    }

    const { fecha_entrega, hora_entrega, ...res } = this.solicitudForm.value;
    
    const peticion = {
      ...res,
      solicita: 'Varela',
      componente: this.selectedOP!.componente,
      maquina : this.maquinas.find(m => m.id === res.id_maquina)!.descripcion,  
      id_solicitate: 1,
      id_estado: 1,
      estado: 'Por surtir',
      fecha_registro: new Date(), 
      id: 5,
      fecha_entrega: fecha_entrega!.toISOString().slice(0, 10) + ' ' + hora_entrega!.toTimeString().slice(0, 5)
    }
    this.guardando.set(true);
    await firstValueFrom(this.solicitudService.agregarSolicitud(peticion));
    this.guardando.set(false);
    console.log(peticion);
    this.router.navigate(['/solicitudes']);
  }
}
