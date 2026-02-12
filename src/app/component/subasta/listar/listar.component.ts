import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subasta } from 'src/app/model/subasta';
import { Evento } from 'src/app/model/evento';
import { SubastaService } from 'src/app/service/subasta.service';
import { EventoService } from 'src/app/service/evento.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  eventos: Evento[] = [];
  eventoSeleccionado: number | null = null;
  subastas: Subasta[] = [];
  cargando = false;

  constructor(
    private subastaService: SubastaService,
    private eventoService: EventoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventoService.list().subscribe(data => {
      this.eventos = data.sort((a, b) => new Date(b.fechaEvento).getTime() - new Date(a.fechaEvento).getTime());
      if (this.eventos.length > 0) {
        this.eventoSeleccionado = this.eventos[0].id;
        this.cargarSubastasPorEvento();
      }
    });
  }

  cargarSubastasPorEvento() {
    if (!this.eventoSeleccionado) return;
    this.cargando = true;
    this.subastaService.listByEvento(this.eventoSeleccionado).subscribe({
      next: data => {
        this.subastas = data.sort((a, b) => (a.numeroSubasta ?? 0) - (b.numeroSubasta ?? 0));
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  editar(s: Subasta) {
    this.router.navigate(['/components/subastas', s.id]);
  }

  eliminar(id: number) {
    this.subastaService.delete(id).subscribe(() => this.cargarSubastasPorEvento());
  }

  crearSubasta() {
    if (!this.eventoSeleccionado) return;
    this.router.navigate(['/components/subastas'], { state: { eventoId: this.eventoSeleccionado } });
  }

  verDetalles(s: Subasta) {
    this.router.navigate(['/components/detalles'], { state: { subasta: s } });
  }

}
