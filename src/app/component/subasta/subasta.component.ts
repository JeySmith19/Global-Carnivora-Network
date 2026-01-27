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

  isLoading: boolean = false;
  mensajeEstado: string = '';
  registroExitoso: boolean = false;

  constructor(
    private subastaService: SubastaService,
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarEventosAbiertos();
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
        this.subasta = { ...data };
        this.previewUrl = data.imagen || null;
      },
      error: () => {}
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
    if (!this.validarSubasta()) return;

    this.isLoading = true;
    this.registroExitoso = false;
    this.mensajeEstado = 'Registrando subasta... esto puede tardar unos segundos';

    this.subastaService.insert(this.subasta).subscribe({
      next: () => {
        this.isLoading = false;
        this.registroExitoso = true;
        this.mensajeEstado = 'Subasta registrada correctamente ✔';
        setTimeout(() => this.cancelarEdicion(), 1500);
      },
      error: () => {
        this.isLoading = false;
        this.mensajeEstado = 'Ocurrió un error al registrar la subasta';
      }
    });
  }

  guardarEdicion() {
    if (!this.subastaEditando) return;
    if (!this.validarSubasta()) return;

    this.isLoading = true;
    this.registroExitoso = false;
    this.mensajeEstado = 'Guardando cambios... esto puede tardar unos segundos';

    this.subastaService.update(this.subastaEditando.id, this.subasta).subscribe({
      next: () => {
        this.isLoading = false;
        this.registroExitoso = true;
        this.mensajeEstado = 'Cambios guardados correctamente ✔';
        setTimeout(() => this.cancelarEdicion(), 1500);
      },
      error: () => {
        this.isLoading = false;
        this.mensajeEstado = 'Ocurrió un error al guardar los cambios';
      }
    });
  }

  validarSubasta(): boolean {
    if (!this.subasta.eventoId) return false;
    if (!this.subasta.planta?.trim()) return false;
    if (!this.subasta.precioBase || this.subasta.precioBase <= 0) return false;
    if (!this.subasta.imagen) return false;
    if (!this.subasta.observaciones?.trim()) this.subasta.observaciones = '-';
    return true;
  }

  cancelarEdicion() {
    this.subasta = new Subasta();
    this.subastaEditando = null;
    this.previewUrl = null;
    this.mensajeEstado = '';
    this.registroExitoso = false;
    history.back();
  }
}