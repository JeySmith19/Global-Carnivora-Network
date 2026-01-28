import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/service/evento.service';
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

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();

    setInterval(() => {
      this.eventos.forEach(e => {
        if (e.estado === 'ABIERTO') {
          this.eventoService.autoCerrar(e.id).subscribe(() => {
            this.listar();
          });
        }
      });
    }, 60000);
  }

  listar() {
    this.eventoService.list().subscribe(data => {
      this.eventos = data;
      this.hayEventoAbierto = this.eventos.some(e => e.estado === 'ABIERTO');
    });
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
}