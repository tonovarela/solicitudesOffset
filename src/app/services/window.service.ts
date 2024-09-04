import { Injectable, computed, signal } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private _resizeObservable$: Observable<Event> = new Observable<Event>();
  
  constructor() {
  }

  
  public ResizeHeight() {
    this._resizeObservable$ = fromEvent(window, 'resize')
    return this._resizeObservable$;
  }







}
