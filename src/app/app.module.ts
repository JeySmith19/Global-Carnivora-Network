import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/security/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterComponent } from './component/security/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { ReceptorService } from './service/security/receptor.service';
import { MantenimientoComponent } from './component/mantenimiento/mantenimiento.component';
import { RecoverPasswordComponent } from './component/security/recover-password/recover-password.component';
import { CodeRecoverPasswordComponent } from './component/security/code-recover-password/code-recover-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MantenimientoComponent,
    RecoverPasswordComponent,
    CodeRecoverPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatNativeDateModule,

  ],
  providers: [
{ provide: HTTP_INTERCEPTORS, useClass: ReceptorService, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
