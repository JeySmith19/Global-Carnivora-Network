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
        this.previewUrl = typeof data.imagen === 'string' ? data.imagen : null;
      },
      error: () => {}
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.subasta.imagen = file; // guardamos el File real
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.previewUrl = reader.result; // preview base64
    };
  }

  private buildFormData(subasta: Subasta): FormData {
    const formData = new FormData();

    // Enviar archivo si existe
    if (subasta.imagen instanceof File) {
      formData.append('archivo', subasta.imagen);
    }

    // Crear DTO limpio sin 'imagen'
    const dto: any = { ...subasta };
    if (dto.imagen instanceof File) delete dto.imagen;

    formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    return formData;
  }

  crear() {
    if (!this.validarSubasta()) return;

    this.isLoading = true;
    this.registroExitoso = false;
    this.mensajeEstado = 'Registrando subasta...';

    const formData = this.buildFormData(this.subasta);

    this.subastaService.insertFormData(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.registroExitoso = true;
        this.mensajeEstado = 'Subasta registrada ✔';
        setTimeout(() => this.cancelarEdicion(), 1500);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.mensajeEstado = 'Error al registrar la subasta';
      }
    });
  }

  guardarEdicion() {
    if (!this.subastaEditando) return;
    if (!this.validarSubasta()) return;

    this.isLoading = true;
    this.registroExitoso = false;
    this.mensajeEstado = 'Guardando cambios...';

    const formData = this.buildFormData(this.subasta);

    this.subastaService.updateFormData(this.subastaEditando.id, formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.registroExitoso = true;
        this.mensajeEstado = 'Cambios guardados ✔';
        setTimeout(() => this.cancelarEdicion(), 1500);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.mensajeEstado = 'Error al guardar los cambios';
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
