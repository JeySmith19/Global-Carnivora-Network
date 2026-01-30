import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/service/security/solicitud.service';
@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {

  pendientes: any[] = [];
  loading = false;
  message = '';

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes() {
    this.loading = true;
    this.solicitudService.listarPendientes().subscribe({
      next: (data: any) => {
        this.pendientes = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message = 'Error al cargar solicitudes';
      }
    });
  }

  aprobar(id: number) {
    this.solicitudService.aprobar(id).subscribe(() => {
      this.cargarPendientes();
    });
  }

  rechazar(id: number) {
    this.solicitudService.rechazar(id).subscribe(() => {
      this.cargarPendientes();
    });
  }
}