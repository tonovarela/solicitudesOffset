import { AfterViewInit, Component, computed, effect, EffectRef, inject, OnInit } from '@angular/core';
import { environment } from '@env/environment.development';
import { StatusLogin } from '@interfaces/usuario.interface';
import { UsuarioService } from '@services/usuario.service';


declare var cargandoPlugins: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   implements OnInit,AfterViewInit {
  appName = environment.appName;
  usuarioService = inject(UsuarioService);
  anio: number = new Date().getFullYear();
  effectRef:EffectRef;  
  statusLogin = computed(() => {
    return this.usuarioService.statusLogin();
  })
  constructor(){
    this.effectRef = effect(() => {      
      switch (this.usuarioService.statusLogin()) {
        case StatusLogin.LOGOUT:
          this.salirApp();
          break;
          
        case StatusLogin.ERROR:          
          //this.uiService.mostrarAlertaError(this.appName, "Login incorrecto");
          this.salirApp();
          break;
      }

    }, {
      allowSignalWrites: true
    })
  }
  ngOnInit(): void {
    this.verificarLogin();
  }

  salirApp() {    
    this.usuarioService.logout();    
  }




  async verificarLogin() {
    const user = localStorage.getItem("User") || 'mestelles';
    const password = localStorage.getItem("Pass") || '54321';                
    
    this.usuarioService.statusLogin.set(StatusLogin.INITIAL);      
    
    // if (!environment.production){
    //     this.usuarioService.setUsuarioDesarrollo();        
    //     console.log({user,password});
    //     return;
    // }    
    // if (!(user != null && password != null)) {      
    //   this.usuarioService.statusLogin.set(StatusLogin.ERROR);      
    //   return;
    // }    
    
    try { 
      this.usuarioService.statusLogin.set(StatusLogin.PROCESSING);         
       await this.usuarioService.login(user, password);
       
       this.usuarioService.statusLogin.set(StatusLogin.LOGGED);
    } catch (error) {      
      this.usuarioService.statusLogin.set(StatusLogin.ERROR);
    }

  }


  ngAfterViewInit(): void {
    cargandoPlugins();
  }
  
}
