import {  Component, computed, effect, EffectRef, inject, OnInit, signal } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import { ExcelExportService, ReorderService, ToolbarService } from '@syncfusion/ej2-angular-grids';

import { Router } from '@angular/router';


import { ColumnSolicitud, Firma, Solicitud } from '@interfaces/solicitud.interface';
import { SolicitudService } from '@services/solicitud.service';
import { SurtidoService } from '@services/surtido.service';
import { UiService } from '@services/ui.service';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
  providers: [ReorderService, ExcelExportService, ToolbarService,],
})
export class SolicitudesComponent extends BaseGridComponent implements OnInit {
  router = inject(Router);
  solicitudService = inject(SolicitudService);
  surtidoService = inject(SurtidoService);
  uiService = inject(UiService);
  usuarioService = inject(UsuarioService)
  solicitudes = computed(() => this.solicitudService.solicitudes());
  cargandoSolicitudes = computed(() => this.solicitudService.cargandoSolicitudes());
  pendientes = computed(() => this.uiService.pendientes());
  firmas = signal<Firma[]>([]);
  cargandoFirmas= signal(false);

  effectRef:EffectRef[]=[];
  modalCancelacion = false;
  modalFirma= false;
  motivoCancelacion = '';
  solicitudPorCancelar: Solicitud | null = null;
  cancelandoSolicitud = false;
  protected minusHeight = 0.2;

  constructor() {
    super();
    const effectCarga=effect(() => {
      const pendientes = this.uiService.pendientes();       
      this.solicitudService.cargarSolicitudes(pendientes);
    });
    const effectLoader=effect(() => {
      try {
        if (this.solicitudes().length ==0 && !this.cargandoSolicitudes() ) {                
          (this.grid.localeObj as any).localeStrings.EmptyRecord = `        
          <div class="w-full h-[20vh] mt-5 flex sm:justify-center  justify-start ">
              <p class="text-slate-500 text-3xl">Sin registros</p>                
          </div>        
        `       
        }
      }catch(e){
      }
      
    });
    this.effectRef.push(effectCarga,effectLoader
    );    
  }
  ngOnInit(): void {
    this.autoFitColumns = false;    
    this.iniciarResizeGrid(this.minusHeight);
    this.solicitudService.cargarSolicitudes(this.uiService.pendientes());

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.effectRef.forEach(e=>e.destroy());
  }
 

  surtir(orden: ColumnSolicitud) {
    this.router.navigate(['/surtir']);
    const { column, index, ...res } = orden
    this.surtidoService.setSolicitudPorSurtir(res);
  }
  tooglePendientes() {
    this.uiService.toggleSolicitudesPendientes();
  }

  mostrarModal(solicitud: Solicitud) {
    this.modalCancelacion = true;
    this.solicitudPorCancelar = solicitud;

  }

  cerrarModal() {
    this.motivoCancelacion = '';
    this.modalCancelacion = false;
    this.solicitudPorCancelar = null;
  }

  async cerrarSolicitud() {
    if (this.motivoCancelacion.trim().length <= 3) {
      return;
    };    
    const id_solicitud = this.solicitudPorCancelar?.id_solicitud!;
    const usuario =this.usuarioService.usuarioLogueado();
    this.cancelandoSolicitud = true;
    await firstValueFrom(this.solicitudService.cancelarSolicitud(id_solicitud, this.motivoCancelacion,usuario.id))
    this.cancelandoSolicitud = false;
    this.solicitudService.cargarSolicitudes(this.uiService.pendientes());
    
    this.cerrarModal();
  }

  cerrarModalFirmas() {
    this.modalFirma = false;
    this.firmas.set([]);
    this.cargandoFirmas.set(false);
  }

  mostrarSurtidoFirmas(id_solicitud: number) {
    this.modalFirma= true;
    this.cargandoFirmas.set(true);
    this.solicitudService.obtenerFirmasSurtido(id_solicitud).subscribe(({firmas})=>this.firmas.set(firmas.map(f=>{return {...f,
      personal:`https://servicios.litoprocess.com/colaboradores/api/foto/${f.personal || 0}`,
      firma:"data:image/png;base64,"+f.firma}})));
    this.cargandoFirmas.set(false);
    
  }

  

}
