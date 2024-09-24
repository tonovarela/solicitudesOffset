import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  uiService = inject(UiService);  
  usuarioService = inject(UsuarioService);
  toogleSideBar() {    
   this.uiService.toogleMenu(); 
  }
}
