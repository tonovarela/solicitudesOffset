import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { environment } from '@env/environment.development';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  uiService = inject(UiService);
  isDebug= !environment.production;


  toogleMenu() {
    console.log("toogleMenu");
    this.uiService.toogleMenu();
  }
}
