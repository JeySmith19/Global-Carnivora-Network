import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRoutingModule } from './component-routing.module';
import { EventoComponent } from './evento/evento.component';
import { SubastaComponent } from './subasta/subasta.component';
import { FormsModule } from '@angular/forms';
import { ListarComponent } from './subasta/listar/listar.component';
import { InformacionSubastaComponent } from './subasta/listar/informacion-subasta/informacion-subasta.component';




@NgModule({
  declarations: [
    EventoComponent,
    SubastaComponent,
    ListarComponent,
    InformacionSubastaComponent
  ],
  
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule
  ]
})
export class ComponentModule { }
