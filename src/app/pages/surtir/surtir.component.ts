import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SurtidoService } from '../../services/surtido.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-surtir',
  templateUrl: './surtir.component.html',
  styleUrl: './surtir.component.css'
})
export class SurtirComponent implements OnInit {

  private surtidoService =inject(SurtidoService);
  public firmar = signal(false);
  public estaRegistrando = signal(false);
  router = inject(Router);
  cantidadSurtir = 0;
  ngOnInit(): void {
    if (!this.surtidoService.existeSolicitudPorSurtir() ) {
      this.router.navigate(['/solicitudes']);
    }
  }


  surtir(){
    if (this.estaRegistrando()) {
      return;
    }
    this.firmar.set(true);
  }

  SolicitudPorSurtir= computed(() => this.surtidoService.SolicitudPorSurtir());
  guardaFirma(base64: string) {
  
    const request  = {
      id_solicitud: this.SolicitudPorSurtir()?.id,      
      firma:base64,
      id_usuario:1,
      cantidadSurtida: this.cantidadSurtir,      
    };
  console.log(request);
    //this.firmar.set(false);
  }

  regresar(){
    if (this.estaRegistrando()) {
      return;
    }
    this.router.navigate(['/solicitudes']);
  }

  modificarCantidad(){
    if (this.estaRegistrando()) {
      return;
    }
   this.ocultarFirma();
  }

  ocultarFirma(){
    setTimeout(() => {
      this.firmar.set(false);
    }, 500);
  }
}
