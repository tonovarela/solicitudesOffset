import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.development';
import { ResponseAuth } from '@interfaces/response.interface';
import { Rol, StatusLogin, Usuario } from '@interfaces/usuario.interface';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario = signal<Usuario | undefined>(undefined);
  private urlAPI = environment.apiUrl;
  private http = inject(HttpClient);
  public statusLogin = signal<StatusLogin>(StatusLogin.INITIAL);
  constructor() { }

  usuarioLogueado= computed(() => {
    return {id:this.usuario()?.id || "0",nombre:this.usuario()?.nombre || "--",rol:this.usuario()?.rol || "0",personal:this.usuario()?.personal || "0"};
  })

  setUsuarioDesarrollo(){
    this.statusLogin.set(StatusLogin.PROCESSING);    
    this.usuario.set({id:"93",nombre:"mestelles",personal:"2801",rol:Rol.ADMINISTRADOR});
    this.statusLogin.set(StatusLogin.LOGGED);
  }
  login(login: string, password: string) {
        
    return firstValueFrom(this.http.post<ResponseAuth>(this.urlAPI + "/api/auth/login", { login, password }).pipe(
      map((response: ResponseAuth) => {                        
         const {usuario} = response;
        this.usuario.set({ ...usuario });
        return response;
      
      })
    ))
  }

  logout() {    
    const esProduccion = environment.production;    
    if (esProduccion) {
      window.location.href = "/litoapps";
      localStorage.removeItem("User");
      localStorage.removeItem("Pass");
      return;
    }
  }

  puedeCancelar = computed(()=>this.usuario()?.rol === Rol.ADMINISTRADOR);
  puedeSurtir = computed(()=>this.usuario()?.rol === Rol.ADMINISTRADOR);
}
