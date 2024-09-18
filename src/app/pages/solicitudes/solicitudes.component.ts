import { AfterViewInit, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import { ExcelExportService, ReorderService, ToolbarService } from '@syncfusion/ej2-angular-grids';

import { Router } from '@angular/router';


import { ColumnSolicitud, Solicitud } from '@interfaces/solicitud.interface';
import { SolicitudService } from '@services/solicitud.service';
import { SurtidoService } from '@services/surtido.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
  providers: [ReorderService, ExcelExportService,ToolbarService],
})
export class SolicitudesComponent extends BaseGridComponent implements OnInit, AfterViewInit {
  router = inject(Router);  
  solicitudService = inject(SolicitudService);
  surtidoService = inject(SurtidoService);
  solicitudes= computed(() => this.solicitudService.solicitudes());
  pendientes=signal(true);

  protected minusHeight = 0.2;
  constructor() { 
    super();
    effect(() => {
       this.solicitudService.cargarSolicitudes(this.pendientes());
    });
  }
  ngOnInit(): void {
    this.autoFitColumns = false;        
    this.solicitudService.cargarSolicitudes(true);
    this.iniciarResizeGrid(this.minusHeight);

  }
  ngAfterViewInit(): void {

    
  }

  surtir(orden: ColumnSolicitud) {
    this.router.navigate(['/surtir']);    
    const { column, index, ...res } = orden
    this.surtidoService.setSolicitudPorSurtir(res);
  }
  tooglePendientes(){
    this.pendientes.set(!this.pendientes());    
  }

}
