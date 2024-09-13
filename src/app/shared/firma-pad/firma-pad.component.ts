import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-firma-pad',
  templateUrl: './firma-pad.component.html',
  styleUrls: ['./firma-pad.component.scss']
})
export class FirmaPadComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {    
    this.subs.forEach(sub => sub.unsubscribe());
  }

  subs: Subscription[] = [];
  @Output("onGuardarFirma") _onGuardarFirm = new EventEmitter<string>();
  @Input("habilitarBotones") habilitarBotones = true;
  signaturePad: SignaturePad | undefined;

  ngOnInit(): void {
  }

  resizeCanvas() {
    const canvas = document.querySelector("canvas")!;
    const parent = document.getElementById("contenedorFirma")!;  
    this.signaturePad?.clear();
    canvas.setAttribute("width", parent.clientWidth.toString());

  }
  ngAfterViewInit() {
    const canvas = document.querySelector("canvas")!;
    const parentWidth = document.getElementById("contenedorFirma")!;
    canvas.setAttribute("width", parentWidth.clientWidth.toString());
    canvas.setAttribute("height", (parentWidth.clientHeight + 150).toString());
    this.signaturePad = new SignaturePad(canvas);
    const sub = fromEvent(window, "resize").subscribe(() => this.resizeCanvas());
    this.subs.push(sub);
    

  }
  startDrawing(event: Event) {
    // works in device not in browser	
  }

  moved(event: Event) {
    // works in device not in browser
  }

  limpiarPad() {
    this.signaturePad?.clear();
  }

  get tieneFirma() {
    if (this.signaturePad == undefined) {
      return false;
    }
    return !this.signaturePad.isEmpty();
  }

  guardarPad() {
    const base64Data = this.signaturePad!.toDataURL();
    this.limpiarPad();
    this._onGuardarFirm.emit(base64Data);
  }

}
