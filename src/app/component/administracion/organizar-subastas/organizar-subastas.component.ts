import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { Subasta } from 'src/app/model/subasta';
import { AdministracionService } from 'src/app/service/administracion.service';
import { SubastaService } from 'src/app/service/subasta.service';
import { EventoService } from 'src/app/service/evento.service';

@Component({
  selector: 'app-organizar-subastas',
  templateUrl: './organizar-subastas.component.html',
  styleUrls: ['./organizar-subastas.component.css']
})
export class OrganizarSubastasComponent implements OnInit {

  idEvento!: number;
  subastas: Subasta[] = [];
  evento: Evento = new Evento();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subastaService: SubastaService,
    private adminService: AdministracionService,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    this.idEvento = Number(this.route.snapshot.paramMap.get('idEvento'));
    this.cargarEvento();
    this.cargarSubastas();
  }

  cargarEvento() {
    this.eventoService.listId(this.idEvento).subscribe(
      data => {
        this.evento = data;
      },
      err => {
        console.error('Error al cargar el evento', err);
      }
    );
  }

  cargarSubastas() {
    this.subastaService.listByEvento(this.idEvento).subscribe(
      data => {
        this.subastas = data.filter(s =>
          s.estado === 'PENDIENTE' || s.estado === 'RECHAZADA'
        );
      },
      err => {
        console.error('Error al cargar subastas', err);
      }
    );
  }

  volver() {
    this.router.navigate(['/components/eventos']);
  }

  aceptar(subasta: Subasta) {
    this.adminService.decidirSubasta(subasta.id, 'ACEPTADA')
      .subscribe(() => this.cargarSubastas());
  }

  rechazar(subasta: Subasta) {
    this.adminService.decidirSubasta(subasta.id, 'RECHAZADA')
      .subscribe(() => this.cargarSubastas());
  }

  verAceptadas() {
    this.router.navigate(['/components/subastas-aceptadas', this.idEvento]);
  }
}