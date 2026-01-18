import { Component, OnInit } from '@angular/core';
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

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.listar();

    // Verifica cierre automático cada 60 segundos
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
    });
  }

  guardar() {
    this.eventoService.insert(this.evento).subscribe(() => {
      this.limpiar();
      this.listar();
      this.showForm = !this.showForm;
    });
  }

  seleccionar(e: Evento) {
    this.evento = { ...e };
    this.editando = true;
  }

  actualizar() {
    this.eventoService.insert(this.evento).subscribe(() => {
      this.limpiar();
      this.listar();
      this.showForm = !this.showForm;
    });
  }

  eliminar(id: number) {
    this.eventoService.delete(id).subscribe(() => {
      this.listar();
    });
  }

  cerrarManual(id: number) {
    this.eventoService.updateEstado(id, 'CERRADO').subscribe(() => {
      this.listar();
    });
  }

  toggleForm() {
  this.showForm = !this.showForm;
  if (!this.showForm) {
    this.limpiar();
  }
}

  limpiar() {
    this.evento = new Evento();
    this.editando = false;
  }
}
