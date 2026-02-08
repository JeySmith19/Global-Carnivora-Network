import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/service/security/solicitud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Roles } from 'src/app/model/security/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  loading = false;
  message = '';
  accepted = false;
  tieneSolicitudPendiente = false;
  esSubastador = false;
  closing = false;

  private baseUrl = environment.base;

  constructor(
    private solicitudService: SolicitudService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEstadoSolicitud();
  }

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  cargarEstadoSolicitud() {
    this.http.get<any>(
      `${this.baseUrl}/users/details`,
      { headers: this.getHeaders() }
    ).subscribe({
      next: res => {
        const roles: string[] = res.roles || [];

        this.tieneSolicitudPendiente = roles.includes(Roles.SUBASTADOR_PENDIENTE);
        this.esSubastador = roles.includes(Roles.SUBASTADOR);
      }
    });
  }

  solicitar() {
    if (!this.accepted || this.tieneSolicitudPendiente) return;

    this.loading = true;
    this.message = '';

    this.solicitudService.solicitarSubastador().subscribe({
      next: () => {
        this.loading = false;
        this.tieneSolicitudPendiente = true;
        this.message = 'Tu solicitud fue enviada correctamente.';
      },
      error: err => {
        this.loading = false;
        this.message = err.error?.message || 'No se pudo enviar la solicitud';
      }
    });
  }

  logout() {
    if (!confirm('¿Seguro que deseas cerrar sesión?')) return;

    this.closing = true;
    sessionStorage.clear();
    localStorage.clear();

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 600);
  }
}
