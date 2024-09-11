import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';

import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { SynfusionModule } from './lib/synfusion/synfusion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from './lib/primeng/primeng.module';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,    
    NuevoComponent,
    SolicitudesComponent
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    SynfusionModule,    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
