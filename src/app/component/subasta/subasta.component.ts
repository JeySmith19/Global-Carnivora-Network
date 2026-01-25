import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubastaService } from 'src/app/service/subasta.service';
import { EventoService } from 'src/app/service/evento.service';
import { Subasta } from 'src/app/model/subasta';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.css']
})
export class SubastaComponent implements OnInit {

  subasta: Subasta = new Subasta();
  eventosAbiertos: Evento[] = [];
  previewUrl: string | ArrayBuffer | null = null;
  subastaEditando: Subasta | null = null;

  constructor(
    private subastaService: SubastaService,
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarEventosAbiertos();

    // Leer id desde la ruta si es edición
    const idEdicion = this.route.snapshot.paramMap.get('id');
    if (idEdicion) {
      this.cargarSubasta(+idEdicion);
    }
  }

  cargarEventosAbiertos() {
    this.eventoService.list().subscribe(data => {
      this.eventosAbiertos = data.filter(e => e.estado === 'ABIERTO');
    });
  }

  cargarSubasta(id: number) {
    this.subastaService.getById(id).subscribe({
      next: (data) => {
        this.subastaEditando = data;
        this.subasta = { ...data }; // llenar formulario
        this.previewUrl = data.imagen || null;
      },
      error: (err) => console.error('Error al cargar subasta', err)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.previewUrl = reader.result;
      this.subasta.imagen = reader.result as string;
    };
  }

  crear() {
    if (!this.subasta.eventoId) {
      alert("Selecciona un evento válido");
      return;
    }
    if (!this.subasta.planta?.trim()) {
      alert("La planta es obligatoria");
      return;
    }
    if (!this.subasta.precioBase || this.subasta.precioBase <= 0) {
      alert("El precio base debe ser mayor a 0");
      return;
    }
    if (!this.subasta.imagen) {
      alert("Debes subir una imagen");
      return;
    }
    if (!this.subasta.observaciones?.trim()) {
      this.subasta.observaciones = "-";
    }

    this.subastaService.insert(this.subasta).subscribe({
      next: () => this.cancelarEdicion(),
      error: err => console.error("Error al crear subasta", err)
    });
  }

  guardarEdicion() {
    if (!this.subastaEditando) return;

    if (!this.subasta.planta?.trim()) {
      alert("La planta es obligatoria");
      return;
    }
    if (!this.subasta.precioBase || this.subasta.precioBase <= 0) {
      alert("El precio base debe ser mayor a 0");
      return;
    }
    if (!this.subasta.imagen) {
      alert("Debes subir una imagen");
      return;
    }
    if (!this.subasta.observaciones?.trim()) {
      this.subasta.observaciones = "-";
    }

    this.subastaService.update(this.subastaEditando.id, this.subasta)
      .subscribe(() => this.cancelarEdicion());
  }

  cancelarEdicion() {
    this.subasta = new Subasta();
    this.subastaEditando = null;
    this.previewUrl = null;
    history.back();
  }
}
