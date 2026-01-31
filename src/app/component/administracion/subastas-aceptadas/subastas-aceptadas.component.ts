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
  cargando = false;
  showZoom = false;
  zoomSrc: string = '';

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
    this.adminService.listarSubastasAceptadas().subscribe(data => {
      this.subastas = data.filter(s => s.eventoId === this.eventoId);
    });
  }

  Generar() {
    if (this.generando) return;

    this.generando = true;

    this.adminService.organizarSubastas(this.eventoId).subscribe({
      next: () => {
        this.cargarSubastasAceptadas();
        this.generando = false;
      },
      error: () => {
        alert('Debes cerrar el evento antes de generar las subastas.');
        this.generando = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/components/eventos']);
  }

  copiarSubasta(s: Subasta) {
    const fecha = s.fechaEvento ? new Date(s.fechaEvento).toLocaleDateString('es-PE') : '-';
    const horaInicio = s.horaInicioAsignada ? s.horaInicioAsignada.slice(0, 5) : '-';
    const horaFin = s.horaFinAsignada ? s.horaFinAsignada.slice(0, 5) : '-';

    const texto = `*🌱ᑭᑌᒍᗩ ᑕᗩᖇᑎíᐯᗝᖇᗩ N° ${s.numeroSubasta || '-'}*

📅 Fecha: ${fecha}

⏰ Hora: ${horaInicio} pm – ${horaFin} pm

⏳ Tiempo: ${s.duracionSubastaMinutos ?? '-'} minutos

👤 Subastador: 
${s.username || '-'}

📞 Contacto: 
${s.phone || '-'}

📍 Procedencia: 
${s.city || '-'}

🌿 Planta en subasta: 
${s.planta || '-'}

🪴 Tamaño de maceta: 
${s.maceta || '-'}

💰 Precio base: 
S/ ${s.precioBase ?? '-'}

📝 Observaciones: 
${s.observaciones || '-'}

🌍 Global Carnivora Network – 𝓛𝓪 𝓟𝓾𝓳𝓪 𝓒𝓪𝓻𝓷í𝓿𝓸𝓻𝓪 🌱`;

    navigator.clipboard.writeText(texto);

    if (s.imagen) {
      try {
        const base64Data = s.imagen.split(',')[1];
        const blob = new Blob(
          [Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))],
          { type: 'image/jpeg' }
        );
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `subasta_${s.numeroSubasta || 'imagen'}.jpg`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch {}
    }
  }
}
