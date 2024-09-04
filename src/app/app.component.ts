import { AfterViewInit, Component, OnInit } from '@angular/core';


declare var cargandoPlugins: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   implements OnInit,AfterViewInit {
  anio: number = new Date().getFullYear();
  ngAfterViewInit(): void {
    cargandoPlugins();
  }
  ngOnInit(): void {
    
  }
  title = 'OffsetSalidas';
}
