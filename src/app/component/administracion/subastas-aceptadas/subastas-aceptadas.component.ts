import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subasta } from 'src/app/model/subasta';
import { AdministracionService } from 'src/app/service/administracion.service';

@Component({
  selector: 'app-subastas-aceptadas',
  templateUrl: './subastas-aceptadas.component.html',
  styleUrls: ['./subastas-aceptadas.component.css']
})
export class SubastasAceptadasComponent implements OnInit {

  subastas: Subasta[] = [];
  eventoId!: number;
  generando = false;

  constructor(
    private adminService: AdministracionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventoId = Number(this.route.snapshot.paramMap.get('idEvento'));
    this.cargarSubastasAceptadas();
  }

  cargarSubastasAceptadas() {
    this.adminService.listarSubastasAceptadas()
      .subscribe(data => {
        this.subastas = data.filter(s => s.eventoId === this.eventoId);
      });
  }

  Generar() {
    if (this.generando) return;

    this.generando = true;

    this.adminService.organizarSubastas(this.eventoId)
      .subscribe({
        next: () => {
          this.cargarSubastasAceptadas();
          this.generando = false;
        },
        error: () => {
          this.generando = false;
        }
      });
  }

  volver() {
    this.router.navigate(['/components/eventos']);
  }
}
