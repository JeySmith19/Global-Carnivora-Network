import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventoComponent } from './evento/evento.component';
import { SubastaComponent } from './subasta/subasta.component';
import { ListarComponent } from './subasta/listar/listar.component';
import { InformacionSubastaComponent } from './subasta/listar/informacion-subasta/informacion-subasta.component';
import { OrganizarSubastasComponent } from './administracion/organizar-subastas/organizar-subastas.component';
import { SubastasAceptadasComponent } from './administracion/subastas-aceptadas/subastas-aceptadas.component';
import { MyDataComponent } from './my-data/my-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventos', component: EventoComponent },
  { path: 'subastas', component: SubastaComponent },
  { path: 'subastas/:id', component: SubastaComponent },
  { path: 'ver-subastas', component: ListarComponent },
  { path: 'detalles', component: InformacionSubastaComponent },
  { path: 'organizar-subastas/:idEvento', component: OrganizarSubastasComponent },
  { path: 'subastas-aceptadas/:idEvento', component: SubastasAceptadasComponent },
  { path: 'mi-informacion', component: MyDataComponent },
  { path: 'dashboard', component: DashboardComponent }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
