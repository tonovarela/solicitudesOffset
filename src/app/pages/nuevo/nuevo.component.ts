import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { firstValueFrom, interval, single, Subject, Subscription, switchMap } from 'rxjs';


import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';


import { maquinas } from '../../data/data';

import { SolicitudService } from '@services/solicitud.service';
import { Maquina, Orden } from '@interfaces/solicitud.interface';
import { locale_es } from '@conf/calendar-es';
import { horaEntregaValidator } from 'src/app/utils/validators';




@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css',

})
export class NuevoComponent implements OnInit, OnDestroy {

  primeConfig = inject(PrimeNGConfig);
  private solicitudService = inject(SolicitudService);
  private router = inject(Router);


  public _today = signal(new Date());

  public valorQuery: string = "";
  public today = computed(() => {
    const fecha = this._today();

    return new Date(fecha.getTime() + (2 * 60 + 1) * 60 * 1000);

  });

  public locale_es = locale_es;
  public maquinas = this.solicitudService.maquinas;

  public selectedOP: Orden | null = null;



  public solicitudForm = new FormGroup({
    op: new FormControl<string | null>(''),
    cantidad: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    id_maquina: new FormControl<string>('', [Validators.required]),
    comentarios: new FormControl<string>(''),
    fecha_entrega: new FormControl<Date>(this.today(), [Validators.required]),
    hora_entrega: new FormControl<Date>(this.today(), [Validators.required]),
  });


  private valorQuerySubject: Subject<string> = new Subject<string>();
  private subscriptions: Subscription[] = [];

  public guardando = signal(false);
  public cargandoBusqueda = signal(false);
  public OPsBusqueda = signal<Orden[]>([]);
  public puedeCapturarCantidad = signal(true);

  constructor() {

    const subscriptionCantidad = this.solicitudForm.get('cantidad')!.valueChanges.subscribe((cantidad) => {
      const opSelected = this.selectedOP!
      if (opSelected == null) return;
      const puedeCapturar =   (cantidad || 0) <= opSelected.cantidad
      this.puedeCapturarCantidad.set(puedeCapturar);
    });
    const subscriptionFecha = this.solicitudForm.get('fecha_entrega')!.valueChanges.subscribe((fecha) => {
      if (fecha != null) this.solicitudForm.get('hora_entrega')!.setValue(null);
    });
    const subscriptionInterval = interval(1000).subscribe(() => {
      this._today.set(new Date());
    });
    this.subscriptions.push(subscriptionInterval);
    this.subscriptions.push(subscriptionCantidad);
    this.subscriptions.push(subscriptionFecha);
    this.valorQuerySubject.pipe(
      switchMap(query => { return this.solicitudService.buscarOP(query) })
    ).subscribe((response) => {
      this.cargandoBusqueda.set(false);
      this.OPsBusqueda.set(response.ordenes);
    })

  }
  ngOnInit(): void {

    this.primeConfig.setTranslation(locale_es);
    this.solicitudForm.get('hora_entrega')!.addValidators(horaEntregaValidator(this.solicitudForm.get('fecha_entrega')!))


  }
  ngOnDestroy(): void {
    this.subscriptions?.forEach(s => s.unsubscribe());
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

  async onSelect({ value }: any) {
    this.selectedOP = value!;

    const { op, componente } = this.selectedOP!
    const resp = await firstValueFrom(this.solicitudService.obtenerSurtido(op, componente));
    this.selectedOP = { ...this.selectedOP!, cantidadSurtida: resp.cantidad };
    this.valorQuery = "";
  }
  closeDetail() {
    this.selectedOP = null; // Cierra el detalle de la OP
    this.solicitudForm.reset(); // Resetea el formulario
    this.solicitudForm.get('cantidad')!.setValue(0); // Restablece el valor de la OP
    this.solicitudForm.get('fecha_entrega')!.setValue(this.today()); // Restablece la fecha de entrega
    this.solicitudForm.get('hora_entrega')!.setValue(this.today()); // Restablece la hora de entrega  
  }


  tieneErrores(nombre: string) {
    return this.solicitudForm.get(nombre)!.invalid && (this.solicitudForm.get(nombre)!.dirty || this.solicitudForm.get(nombre)!.touched)
  }




  async guardarSolicitud() {
    this.solicitudForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    this.solicitudForm.markAllAsTouched();
    if (!this.solicitudForm.valid || !this.puedeCapturarCantidad()) {
      return;
    }
    const { fecha_entrega, hora_entrega, ...res } = this.solicitudForm.value;
    const fechaISO = fecha_entrega!.toISOString();
    const fechaFormateada = `${fechaISO.slice(0, 4)}-${fechaISO.slice(8, 10)}-${fechaISO.slice(5, 7)}`;
    const peticion = {
      ...res,
      op: this.selectedOP!.op,
      id_solicitante: 1,
      componente: this.selectedOP!.componente,      
      fecha_entrega: `${fechaFormateada} ${hora_entrega!.toTimeString().slice(0, 5)}`
    }
    this.guardando.set(true);    
    await firstValueFrom(this.solicitudService.agregarSolicitud(peticion));    
    this.guardando.set(false);
    this.router.navigate(['/solicitudes']);
  }



}
