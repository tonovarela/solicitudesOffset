import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  uiService = inject(UiService);


  toogleMenu() {
    console.log("toogleMenu");
    this.uiService.toogleMenu();
  }
}
