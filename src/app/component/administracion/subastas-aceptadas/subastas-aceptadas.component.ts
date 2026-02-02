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
    this.cargando = true;
    this.adminService.listarSubastasAceptadas().subscribe(data => {
      this.subastas = data
        .filter(s => s.eventoId === this.eventoId)
        .sort((a, b) => (a.numeroSubasta ?? 0) - (b.numeroSubasta ?? 0));
      this.cargando = false;
    }, () => this.cargando = false);
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

  zoom(s: Subasta) {
    if (!s.imagen) return;
    this.zoomSrc = s.imagen as string;
    this.showZoom = true;
  }

  copiarSubasta(s: Subasta) {
    const fecha = s.fechaEvento ?? '-';
    const formatHora = (hora: string | undefined) => {
      if (!hora) return '-';
      const [hh, mm] = hora.split(':').map(Number);
      const period = hh >= 12 ? 'pm' : 'am';
      const h12 = hh % 12 || 12;
      return `${h12}:${mm.toString().padStart(2, '0')} ${period}`;
    };
    const horaInicio = formatHora(s.horaInicioAsignada);
    const horaFin = formatHora(s.horaFinAsignada);

    const texto = `*🌱ᑭᑌᒍᗩ ᑕᗩᖇᑎíᐯᗝᖇᗩ N° ${s.numeroSubasta || '-'}*

📅 Fecha: ${fecha}

⏰ Hora: ${horaInicio} – ${horaFin}

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

    if (!s.imagen) return;

    fetch(s.imagen as string)
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `subasta_${s.numeroSubasta || 'imagen'}.jpg`;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch(() => console.error('No se pudo descargar la imagen'));
  }

  getImagenSrc(s: Subasta): string | null {
    return s.imagen as string || null;
  }

}
