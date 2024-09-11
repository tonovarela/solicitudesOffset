import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import {  obtenerSolicitudes } from '../../data/data';
import { ExcelExportService, ReorderService } from '@syncfusion/ej2-angular-grids';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/solicitud.interface';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
  providers:[ReorderService,ExcelExportService],
})
export class SolicitudesComponent extends BaseGridComponent implements OnInit,AfterViewInit {
  data= signal<Solicitud[]>([]);
  solicitudService= inject(SolicitudService); 
  
  
  protected minusHeight = 0.27;
  ngOnInit(): void {
    this.autoFitColumns=false;
    this.data.set(this.solicitudService.solicitudes());    
    this.iniciarResizeGrid(this.minusHeight);
   
  }
  ngAfterViewInit(): void {
   
  }

}
