import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/service/evento.service';
import { AdministracionService } from 'src/app/service/administracion.service';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  evento: Evento = new Evento();
  eventos: Evento[] = [];
  editando = false;
  showForm = false;
  hayEventoAbierto = false;

  showPrediccion = false;
  eventoPrediccion!: Evento;

  subastasAceptadasPorEvento: Record<number, number> = {};

  constructor(
    private eventoService: EventoService,
    private adminService: AdministracionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.eventoService.list().subscribe(data => {
      this.eventos = data;
      this.hayEventoAbierto = this.eventos.some(e => e.estado === 'ABIERTO');
      this.cargarSubastasAceptadas();
    });
  }

  cargarSubastasAceptadas() {
    this.adminService.listarSubastasAceptadas().subscribe(subs => {
      this.subastasAceptadasPorEvento = {};

      subs.forEach(s => {
        if (s.eventoId == null) return;
        const id = s.eventoId;
        this.subastasAceptadasPorEvento[id] =
          (this.subastasAceptadasPorEvento[id] || 0) + 1;
      });
    });
  }

  getTotalSubastas(eventoId: number): number {
    return this.subastasAceptadasPorEvento[eventoId] || 0;
  }

  guardar() {
    if (this.hayEventoAbierto) return;

    this.eventoService.insert(this.evento).subscribe(() => {
      this.limpiar();
      this.listar();
      this.showForm = false;
    });
  }

  seleccionar(e: Evento) {
    this.evento = { ...e };
    this.editando = true;
  }

  actualizar() {
    this.eventoService.update(this.evento).subscribe(() => {
      this.limpiar();
      this.listar();
      this.showForm = false;
    });
  }

  eliminar(id: number) {
    this.eventoService.delete(id).subscribe(() => {
      this.listar();
    });
  }

  cerrarManual(id: number) {
    if (confirm('¿Estás seguro de que quieres cerrar este evento?')) {
      this.eventoService.updateEstado(id, 'CERRADO').subscribe(() => {
        this.listar();
      });
    }
  }

  irAOrganizarSubastas(idEvento: number) {
    this.router.navigate(['/components/organizar-subastas', idEvento]);
  }

  toggleForm() {
    if (this.hayEventoAbierto && !this.editando) return;
    this.showForm = !this.showForm;
    if (!this.showForm) this.limpiar();
  }

  limpiar() {
    this.evento = new Evento();
    this.editando = false;
  }

  formatearHora(hora: string): string {
    if (!hora) return '-';

    const [h, m] = hora.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);

    return d.toLocaleTimeString('es-PE', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  calcularHoraFin(e: Evento): string {
    const total = this.getTotalSubastas(e.id);
    if (!total || !e.horaInicio) return '-';

    const [h, m] = e.horaInicio.split(':').map(Number);
    const fin = new Date();
    fin.setHours(h, m, 0, 0);

    const minutosTotales =
      total * e.duracionSubastaMinutos +
      (total - 1) * e.descansoMinutos;

    fin.setMinutes(fin.getMinutes() + minutosTotales);

    return fin.toLocaleTimeString('es-PE', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}