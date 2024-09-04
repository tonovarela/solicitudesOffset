import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import {  obtenerSolicitudes } from '../../data/data';
import { ExcelExportService, ReorderService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
  providers:[ReorderService,ExcelExportService],
})
export class SolicitudesComponent extends BaseGridComponent implements OnInit,AfterViewInit {
  data:any[]=[];
  
  
  protected minusHeight = 0.27;
  ngOnInit(): void {
    this.autoFitColumns=false;
    this.data = obtenerSolicitudes();    
    this.iniciarResizeGrid(this.minusHeight);
   
  }
  ngAfterViewInit(): void {
   
  }

}
