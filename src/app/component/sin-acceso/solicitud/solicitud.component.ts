import { Component } from '@angular/core';
import { SolicitudService } from 'src/app/service/security/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {

  loading = false;
  message = '';
  accepted = false;

  constructor(private solicitudService: SolicitudService) {}

  solicitar() {
    if (!this.accepted) return;

    this.loading = true;
    this.message = '';

    this.solicitudService.solicitarSubastador().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = res.message || 'Solicitud enviada correctamente';
      },
      error: err => {
        this.loading = false;
        this.message = err.error?.message || 'No se pudo enviar la solicitud';
      }
    });
  }
}
