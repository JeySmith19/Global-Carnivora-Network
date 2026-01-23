import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subasta } from 'src/app/model/subasta';
import { AdministracionService } from 'src/app/service/administracion.service';

@Component({
  selector: 'app-subastas-aceptadas',
  templateUrl: './subastas-aceptadas.component.html',
  styleUrls: ['./subastas-aceptadas.component.css']
})
export class SubastasAceptadasComponent implements OnInit {

  subastas: Subasta[] = [];

  constructor(
    private adminService: AdministracionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarSubastasAceptadas();
  }

  cargarSubastasAceptadas() {
    // luego podemos filtrar por evento, fecha, etc.
    this.adminService.listarSubastasAceptadas()
      .subscribe(data => this.subastas = data);
  }
  volver() {
    this.router.navigate(['/components/eventos']);
  }
}
