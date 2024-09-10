import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,    
  ],
  exports:[AutoCompleteModule,DropdownModule,InputNumberModule,CalendarModule]
})
export class PrimeNgModule { }
