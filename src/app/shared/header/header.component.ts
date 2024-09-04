import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  uiService = inject(UiService);  
  toogleSideBar() {    
   this.uiService.toogleMenu(); 
  }
}
