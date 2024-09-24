import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SurtidoService } from '../../services/surtido.service';
import { Router } from '@angular/router';
import { PropsSurtido } from '@interfaces/solicitud.interface';
import { firstValueFrom } from 'rxjs';
import { solicitudVacia } from 'src/app/data/data';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-surtir',
  templateUrl: './surtir.component.html',
  styleUrl: './surtir.component.css'
})
export class SurtirComponent implements OnInit {
  
  private surtidoService =inject(SurtidoService);  
  private usuarioService = inject(UsuarioService);
  public firmar = signal(false);

  public estaRegistrando = signal(false);  
  solicitud= computed(() => this.surtidoService.SolicitudPorSurtir() || solicitudVacia);
  cantidad = computed(() => (this.solicitud().cantidad - this.solicitud().cantidadSurtida ));
  maxPorSurtir= computed(() =>    Number(this.solicitud()?.cantidad || 0) - Number(this.solicitud()?.cantidadSurtida || 0)  + 100);  

  cantidadSurtir = 0;  
  router = inject(Router);
  
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

  
  async guardaFirma(base64: string) {  
    const usuario = this.usuarioService.usuarioLogueado();
    const surtido:PropsSurtido  = {
      id_solicitud: this.solicitud()?.id_solicitud!,      
      firma:base64.split(',')[1],
      id_usuario:usuario?.id,
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
