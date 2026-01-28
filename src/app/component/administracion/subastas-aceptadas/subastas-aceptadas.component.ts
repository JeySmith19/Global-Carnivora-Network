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

  // Cargar subastas aceptadas del evento
  cargarSubastasAceptadas() {
    this.adminService.listarSubastasAceptadas()
      .subscribe(data => {
        this.subastas = data.filter(s => s.eventoId === this.eventoId);
      });
  }

  // Generar subastas del evento
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

  // Volver a la lista de eventos
  volver() {
    this.router.navigate(['/components/eventos']);
  }

  // Copiar subasta al portapapeles con formato WhatsApp
  // y descargar la imagen como archivo
  copiarSubasta(s: Subasta) {
    // Formatear fecha si existe
    const fecha = s.fechaEvento ? new Date(s.fechaEvento).toLocaleDateString('es-PE') : '-';

    // Hora sin segundos (HH:mm)
    const horaInicio = s.horaInicioAsignada ? s.horaInicioAsignada.slice(0, 5) : '-';
    const horaFin = s.horaFinAsignada ? s.horaFinAsignada.slice(0, 5) : '-';

    // Texto para WhatsApp
    const texto = `*🌱ᑭᑌᒍᗩ ᑕᗩᖇᑎíᐯᗝᖇᗩ N° ${s.numeroSubasta || '-'}*

✨ 𝓔𝓵 𝓋𝒶𝓁𝑜𝓇 𝓁𝑜 𝒹𝑒𝒸𝒾𝒹𝑒𝓈 𝓉𝓊́

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

    // Copiar texto al portapapeles
    navigator.clipboard.writeText(texto)
      .then(() => alert('Subasta copiada al portapapeles!'))
      .catch(err => console.error('Error al copiar: ', err));

    // Descargar imagen si existe
    if (s.imagen) {
      try {
        const base64Data = s.imagen.split(',')[1]; // quitar prefijo data:image/...
        const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/jpeg' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `subasta_${s.numeroSubasta || 'imagen'}.jpg`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Error al descargar la imagen: ', error);
      }
    }
  }

}