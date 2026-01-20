import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventoComponent } from './evento/evento.component';
import { SubastaComponent } from './subasta/subasta.component';
import { ListarComponent } from './subasta/listar/listar.component';
import { InformacionSubastaComponent } from './subasta/listar/informacion-subasta/informacion-subasta.component';
import { OrganizarSubastasComponent } from './administracion/organizar-subastas/organizar-subastas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventos', component: EventoComponent },
  { path: 'subastas', component: SubastaComponent },        // crear subasta
  { path: 'subastas/:id', component: SubastaComponent },    // editar subasta
  { path: 'ver-subastas', component: ListarComponent },
  { path: 'detalles', component: InformacionSubastaComponent },
  { path: 'organizar-subastas/:idEvento', component: OrganizarSubastasComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
