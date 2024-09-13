import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import { ExcelExportService, ReorderService } from '@syncfusion/ej2-angular-grids';

import { Router } from '@angular/router';


import { ColumnSolicitud, Solicitud } from '@interfaces/solicitud.interface';
import { SolicitudService } from '@services/solicitud.service';
import { SurtidoService } from '@services/surtido.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
  providers: [ReorderService, ExcelExportService],
})
export class SolicitudesComponent extends BaseGridComponent implements OnInit, AfterViewInit {
  router = inject(Router);
  data = signal<Solicitud[]>([]);
  solicitudService = inject(SolicitudService);
  surtidoService = inject(SurtidoService);


  protected minusHeight = 0.27;
  ngOnInit(): void {
    this.autoFitColumns = false;
    this.data.set(this.solicitudService.solicitudes());
    this.iniciarResizeGrid(this.minusHeight);

  }
  ngAfterViewInit(): void {

  }

  surtir(orden: ColumnSolicitud) {
    this.router.navigate(['/surtir']);
    const { column, index, ...res } = orden
    this.surtidoService.setSolicitudPorSurtir(res);
  }

}
