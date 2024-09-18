import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SurtidoService } from '../../services/surtido.service';
import { Router } from '@angular/router';
import { PropsSurtido } from '@interfaces/solicitud.interface';
import { firstValueFrom } from 'rxjs';
import { SolicitudService } from '@services/solicitud.service';



@Component({
  selector: 'app-surtir',
  templateUrl: './surtir.component.html',
  styleUrl: './surtir.component.css'
})
export class SurtirComponent implements OnInit {

  private surtidoService =inject(SurtidoService);
  private solicitudService = inject(SolicitudService);
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
  async guardaFirma(base64: string) {
  
    const surtido:PropsSurtido  = {
      id_solicitud: this.SolicitudPorSurtir()?.id_solicitud!,      
      firma:base64.split(',')[1],
      id_usuario:1,
      cantidad: this.cantidadSurtir,      
    };
    await firstValueFrom(this.surtidoService.registrar(surtido));    
    this.firmar.set(false);
    this.router.navigate(['/solicitudes']);
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
