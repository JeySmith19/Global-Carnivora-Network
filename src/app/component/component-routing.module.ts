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
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { SolicitudComponent } from './sin-acceso/solicitud/solicitud.component';
import { RevisionComponent } from './administracion/revision/revision.component';
import { InicioComponent } from './inicio/inicio.component';
import { TerminosCondicionesSubastadoresComponent } from './sin-acceso/terminos-condiciones-subastadores/terminos-condiciones-subastadores.component';
import { ListanegraComponent } from './listanegra/listanegra.component';
import { HomeGeneralComponent } from './home-general/home-general.component';
import { NavegacionComponentComponent } from './navegacion-component/navegacion-component.component';
import { VolverComponent } from './elementos/botones/volver/volver.component';

const routes: Routes = [
  {
    path: '',
    component: NavegacionComponentComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeGeneralComponent,
        canActivate: [GuardService],
        data: { roles: [Roles.ADMIN, Roles.SUBASTADOR, Roles.SUBASTADOR_PENDIENTE, Roles.USER] }
      },
      {
        path: 'lista-negra',
        component: ListanegraComponent,
        canActivate: [GuardService],
        data: { roles: [Roles.ADMIN, Roles.SUBASTADOR, Roles.SUBASTADOR_PENDIENTE, Roles.USER] }
      },
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
        data: { roles: [Roles.ADMIN, Roles.SUBASTADOR, Roles.SUBASTADOR_PENDIENTE, Roles.USER] }
      },
      {
        path: 'inforcion-subastas',
        component: DashboardComponent,
        canActivate: [GuardService],
        data: { roles: [Roles.ADMIN, Roles.SUBASTADOR] }
      },
      {
        path: 'solicitud-subastador',
        component: SolicitudComponent,
        canActivate: [GuardService],
        data: { roles: [Roles.USER, Roles.SUBASTADOR_PENDIENTE] }
      },
      {
        path: 'revision-solicitudes',
        component: RevisionComponent,
        canActivate: [GuardService],
        data: { roles: [Roles.ADMIN] }
      },
      {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [GuardService],
        data: { roles: [Roles.USER, Roles.SUBASTADOR_PENDIENTE] }
      },
      {
        path: 'terminos-subastador',
        component: TerminosCondicionesSubastadoresComponent,
        canActivate: [GuardService],
        data: { roles: [Roles.ADMIN, Roles.SUBASTADOR] }
      },
      {
        path: 'no-autorizado',
        component: SinAccesoComponent
      },
      {
        path: 'mantenimiento',
        component: MantenimientoComponent
      },
      {
        path: '',
        redirectTo: 'xd',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }