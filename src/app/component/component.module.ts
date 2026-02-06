import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRoutingModule } from './component-routing.module';
import { EventoComponent } from './evento/evento.component';
import { SubastaComponent } from './subasta/subasta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './subasta/listar/listar.component';
import { InformacionSubastaComponent } from './subasta/listar/informacion-subasta/informacion-subasta.component';
import { OrganizarSubastasComponent } from './administracion/organizar-subastas/organizar-subastas.component';
import { SubastasAceptadasComponent } from './administracion/subastas-aceptadas/subastas-aceptadas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyDataComponent } from './my-data/my-data.component';
import { VolverComponent } from './elementos/botones/volver/volver.component';
import { SinAccesoComponent } from './sin-acceso/sin-acceso.component';
import { SolicitudComponent } from './sin-acceso/solicitud/solicitud.component';
import { RevisionComponent } from './administracion/revision/revision.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { TerminosCondicionesSubastadoresComponent } from './sin-acceso/terminos-condiciones-subastadores/terminos-condiciones-subastadores.component';




@NgModule({
  declarations: [
    EventoComponent,
    SubastaComponent,
    ListarComponent,
    InformacionSubastaComponent,
    OrganizarSubastasComponent,
    SubastasAceptadasComponent,
    DashboardComponent,
    MyDataComponent,
    VolverComponent,
    SinAccesoComponent,
    SolicitudComponent,
    RevisionComponent,
    InicioComponent,
    TerminosCondicionesSubastadoresComponent,
    
  ],
  
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ComponentModule { }
