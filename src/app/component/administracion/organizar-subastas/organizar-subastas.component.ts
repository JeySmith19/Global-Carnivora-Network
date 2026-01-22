import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subasta } from 'src/app/model/subasta';
import { AdministracionService } from 'src/app/service/administracion.service';
import { SubastaService } from 'src/app/service/subasta.service';

@Component({
  selector: 'app-organizar-subastas',
  templateUrl: './organizar-subastas.component.html',
  styleUrls: ['./organizar-subastas.component.css']
})
export class OrganizarSubastasComponent implements OnInit {

  idEvento!: number;
  subastas: Subasta[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subastaService: SubastaService,
    private adminService: AdministracionService
  ) {}

  ngOnInit(): void {
    this.idEvento = Number(this.route.snapshot.paramMap.get('idEvento'));
    this.cargarSubastas();
  }

  cargarSubastas() {
    this.subastaService.listByEvento(this.idEvento).subscribe(data => {
      this.subastas = data;
    });
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
}
