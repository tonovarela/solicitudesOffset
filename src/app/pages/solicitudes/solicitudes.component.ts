import { Component, computed, effect, EffectRef, inject, OnInit, signal } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import { ExcelExportService, ReorderService, ToolbarService } from '@syncfusion/ej2-angular-grids';

import { Router } from '@angular/router';


import { ColumnSolicitud, Firma, Solicitud } from '@interfaces/solicitud.interface';
import { SolicitudService } from '@services/solicitud.service';
import { SurtidoService } from '@services/surtido.service';
import { UiService } from '@services/ui.service';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from '@services/usuario.service';
import { PrimeNGConfig } from 'primeng/api';
import { locale_es } from '@conf/calendar-es';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',

  providers: [ReorderService, ExcelExportService, ToolbarService],
})
export class SolicitudesComponent extends BaseGridComponent implements OnInit {
  router = inject(Router);
  private primeConfig = inject(PrimeNGConfig);
  solicitudService = inject(SolicitudService);
  surtidoService = inject(SurtidoService);
  uiService = inject(UiService);
  usuarioService = inject(UsuarioService)
  solicitudes = computed(() => this.solicitudService.solicitudes());
  cargandoSolicitudes = computed(() => this.solicitudService.cargandoSolicitudes());
  pendientes = computed(() => this.uiService.pendientes());
  firmas = signal<Firma[]>([]);
  cargandoFirmas = signal(false);

  effectRef: EffectRef[] = [];
  modalCancelacion = false;
  modalFirma = false;
  motivoCancelacion = { id_motivo: 0, descripcion: '' };
  solicitudPorCancelar: Solicitud | null = null;
  solicitudPorEditarFecha: Solicitud | null = null;

  today = new Date();
  cancelandoSolicitud = false;
  protected minusHeight = 0.2;

  public locale_es = locale_es;

  constructor() {
    super();

    const effectCarga = effect(() => {
      const pendientes = this.uiService.pendientes();
      this.solicitudService.cargarSolicitudes(this.usuarioService.usuarioLogueado().id, pendientes);
    });
    const effectLoader = effect(() => {
      try {
        if (this.solicitudes().length == 0 && !this.cargandoSolicitudes()) {
          (this.grid.localeObj as any).localeStrings.EmptyRecord = `        
          <div class="w-full h-[20vh] mt-5 flex sm:justify-center  justify-start ">
              <p class="text-slate-500 text-3xl">Sin registros</p>                
          </div>        
        `
        }
      } catch (e) {
      }

    });
    this.effectRef.push(effectCarga, effectLoader
    );
  }
  ngOnInit(): void {
    this.autoFitColumns = false;
    this.primeConfig.setTranslation(locale_es);
    this.iniciarResizeGrid(this.minusHeight);
    this.solicitudService.cargarSolicitudes(this.usuarioService.usuarioLogueado().id, this.uiService.pendientes());

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.effectRef.forEach(e => e.destroy());
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
    this.motivoCancelacion = { id_motivo: 0, descripcion: '' };
    this.modalCancelacion = false;
    this.solicitudPorCancelar = null;
  }

  async cerrarSolicitud() {    
    if (this.motivoCancelacion.descripcion.trim().length <= 3 || this.motivoCancelacion.id_motivo == 0) {
      return;
    };
    const id_solicitud = this.solicitudPorCancelar?.id_solicitud!;
    const usuario = this.usuarioService.usuarioLogueado();
    this.cancelandoSolicitud = true;
    const { descripcion: motivo, id_motivo: id_catMotivo } = this.motivoCancelacion;
    await firstValueFrom(this.solicitudService.cancelarSolicitud({
      id_solicitud,
      id_catMotivo,
      motivo,
      id_usuario: usuario.id
    }))
    this.cancelandoSolicitud = false;
    this.solicitudService.cargarSolicitudes(usuario.id, this.uiService.pendientes());

    this.cerrarModal();
  }

  cerrarModalFirmas() {
    this.modalFirma = false;
    this.firmas.set([]);
    this.cargandoFirmas.set(false);
  }

  mostrarSurtidoFirmas(id_solicitud: number) {
    this.modalFirma = true;
    this.cargandoFirmas.set(true);
    this.solicitudService.obtenerFirmasSurtido(id_solicitud).subscribe(({ firmas }) => this.firmas.set(firmas.map(f => {
      return {
        ...f,
        personal: `https://servicios.litoprocess.com/colaboradores/api/foto/${f.personal || 0}`,
        firma: "data:image/png;base64," + f.firma
      }
    })));
    this.cargandoFirmas.set(false);

  }
  editarFechaEntrega(solicitud: Solicitud) {

    this.solicitudPorEditarFecha = { ...solicitud };
    if (typeof solicitud.fecha_entrega === 'string') {
      const dateString = `${solicitud.fecha_entrega}`;
      this.solicitudPorEditarFecha.fecha_entrega = new Date(dateString.replace(" ", "T"));
    }
  }



  cerrarModalEditarFecha() {
    this.solicitudPorEditarFecha = null;
  }

  async guardarFechaEntrega() {
    const { id_solicitud, fecha_entrega } = this.solicitudPorEditarFecha!;
    const id_usuario = this.usuarioService.usuarioLogueado().id;

    const year = fecha_entrega.getFullYear();
    const month = String(fecha_entrega.getMonth() + 1).padStart(2, '0'); 
    const day = String(fecha_entrega.getDate()).padStart(2, '0');
    const time = fecha_entrega.toTimeString().split(' ')[0];
    await firstValueFrom(this.solicitudService.actualizarFechaEntrega({
                                                                        id_solicitud,
                                                                        fecha_entrega: `${year}-${day}-${month} ${time}`,
                                                                        id_usuario
    }));
    this.solicitudPorEditarFecha = null;
    this.solicitudService.cargarSolicitudes(id_usuario, this.uiService.pendientes());

  }

  esAdministrador = computed(() => this.usuarioService.esAdministrador());
  esAlmacenista = computed(() => this.usuarioService.esAlmacenista());



}
