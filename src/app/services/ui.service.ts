import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {


  _pendientes = signal(true);

  pendientes = computed(() => this._pendientes());
  constructor() { }

  toggleSolicitudesPendientes() {
    this._pendientes.set(!this._pendientes());
  }

  mostrarError(error: string) {
    console.log("mostrarError", error);
  }


  toogleMenu() {
    console.log("toogleMenu");
    const sidenav = document.querySelector("aside")!;
    const sidenav_trigger = document.querySelector("[sidenav-trigger]");
    const burger = sidenav_trigger!.firstElementChild;
    const top_bread = burger!.firstElementChild!;
    const bottom_bread = burger!.lastElementChild!;

    if (sidenav.getAttribute("aria-expanded") == "false") {
      sidenav.setAttribute("aria-expanded", "true");
    } else {
      sidenav.setAttribute("aria-expanded", "false");
    }
    sidenav.classList.toggle("ml-6");
    sidenav.classList.toggle("shadow-3xl");
    sidenav.classList.toggle('-translate-x-full');
    top_bread.classList.toggle("translate-x-[5px]");
    bottom_bread.classList.toggle("translate-x-[5px]");
  }





}
