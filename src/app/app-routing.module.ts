import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from './service/security/guard.service';
import { LoginComponent } from './component/security/login/login.component';
import { RegisterComponent } from './component/security/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { MantenimientoComponent } from './component/mantenimiento/mantenimiento.component';
import { CodeRecoverPasswordComponent } from './component/security/code-recover-password/code-recover-password.component';
import { RecoverPasswordComponent } from './component/security/recover-password/recover-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'mantenimiento', component: MantenimientoComponent },
  { path: 'code-reset', component: CodeRecoverPasswordComponent },
  { path: 'reset', component: RecoverPasswordComponent },
  {
    path: 'components',
    loadChildren: () => import('./component/component.module').then((m) => m.ComponentModule),
    canActivate: [GuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
