import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subasta } from 'src/app/model/subasta';
import { SubastaService } from 'src/app/service/subasta.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  subastas: Subasta[] = [];
  cargando = false;

  constructor(
    private subastaService: SubastaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMisSubastas();
  }

  cargarMisSubastas() {
  this.cargando = true;

  this.subastaService.listMisSubastas().subscribe({
    next: (data) => {
      this.subastas = data;
      console.log('Mis subastas actualizadas:', this.subastas);
      this.cargando = false;
    },
    error: () => {
      console.log('Error al cargar subastas');
      this.cargando = false;
    }
  });
}


  editar(s: Subasta) {
    this.router.navigate(['/components/subastas', s.id]);
  }

  eliminar(id: number) {
    this.subastaService.delete(id).subscribe(() => {
      this.cargarMisSubastas();
    });
  }

  crearSubasta() {
    this.router.navigate(['/components/subastas']);
  }

  verDetalles(s: Subasta) {
  this.router.navigate(['/components/detalles'], { state: { subasta: s } });
}

}
