import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MydataService } from 'src/app/service/mydata.service';
import { EventoService } from 'src/app/service/evento.service';
import { SubastaService } from 'src/app/service/subasta.service';
import { Evento } from 'src/app/model/evento';
import { Subasta } from 'src/app/model/subasta';
import { Roles } from 'src/app/model/security/roles';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: any;
  showMenu = false;
  subastas: Subasta[] = [];
  totalSubastas = 0;
  subastasPendientes = 0;
  subastasAceptadas = 0;
  subastasRechazadas = 0;

  eventoActivo: Evento | null = null;
  tiempoRestante = '';
  tituloTiempo = '';
  private timer: any;

  constructor(
    private mydata: MydataService,
    private eventoService: EventoService,
    private subastaService: SubastaService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.mydata.getMyData().subscribe(d => this.user = d);

    this.eventoService.list().subscribe(eventos => {
      this.eventoActivo = eventos.find(e => e.estado === 'ABIERTO') || null;
      if (!this.eventoActivo) return;

      const inicioEvento = this.buildFechaHora(
        this.eventoActivo.fechaEvento,
        this.eventoActivo.horaInicio
      );

      this.iniciarContador(inicioEvento);
      this.cargarSubastas(this.eventoActivo.id);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  go(path: string) {
    this.router.navigate([path]);
  }

  private cargarSubastas(eventoId: number) {
    this.subastaService.listMisSubastas().subscribe(subastas => {
      const subastasEvento = subastas.filter(s => s.eventoId === eventoId);
      this.subastas = subastasEvento;
      this.subastasPendientes = subastasEvento.filter(s => s.estado === 'PENDIENTE').length;
      this.subastasAceptadas = subastasEvento.filter(s => s.estado === 'ACEPTADA').length;
      this.subastasRechazadas = subastasEvento.filter(s => s.estado === 'RECHAZADA').length;
    });
  }

  private buildFechaHora(fecha: any, hora: string): Date {
    const [y, m, d] = fecha.toString().split('-').map(Number);
    const [h, min] = hora.split(':').map(Number);
    return new Date(y, m - 1, d, h, min, 0);
  }

  private iniciarContador(fechaInicio: Date) {
    const tick = () => {

      if (this.eventoActivo?.estado === 'CERRADO') {
        this.tituloTiempo = 'Estado del evento';
        this.tiempoRestante = 'Evento cerrado';
        clearInterval(this.timer);
        return;
      }

      const diff = fechaInicio.getTime() - Date.now();

      if (diff <= 0) {
        this.tituloTiempo = 'Estado del evento';
        this.tiempoRestante = 'Evento en curso';
        clearInterval(this.timer);
        return;
      }

      this.tituloTiempo = 'Inicio del evento en';

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      this.tiempoRestante = `${h}h ${m}m ${s}s`;
    };

    tick();
    this.timer = setInterval(tick, 1000);
  }

  isAdmin(): boolean {
    return this.user?.roles?.includes(Roles.ADMIN);
  }

  goOrganizarEvento() {
this.router.navigate(['/components/eventos']);
}
}