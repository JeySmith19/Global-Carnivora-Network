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
import { GuardService } from '../service/security/guard.service';
import { Roles } from '../model/security/roles';
import { SinAccesoComponent } from './sin-acceso/sin-acceso.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'no-autorizado', component: SinAccesoComponent },

  { 
    path: 'eventos', 
    component: EventoComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN] } 
  },

  { 
    path: 'subastas', 
    component: SubastaComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN, Roles.SUBASTADOR] } 
  },

  { 
    path: 'subastas/:id', 
    component: SubastaComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN, Roles.SUBASTADOR] } 
  },

  { 
    path: 'ver-subastas', 
    component: ListarComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN, Roles.SUBASTADOR] } 
  },

  { 
    path: 'detalles', 
    component: InformacionSubastaComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN, Roles.SUBASTADOR] } 
  },

  { 
    path: 'organizar-subastas/:idEvento', 
    component: OrganizarSubastasComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN] } 
  },

  { 
    path: 'subastas-aceptadas/:idEvento', 
    component: SubastasAceptadasComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN] } 
  },

  { 
    path: 'perfil', 
    component: MyDataComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN, Roles.SUBASTADOR] } 
  },

  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [GuardService], 
    data: { roles: [Roles.ADMIN, Roles.SUBASTADOR] } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }