import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ListanegraService } from 'src/app/service/listanegra.service';
import { ListaNegra } from 'src/app/model/listanegra';
import { Roles } from 'src/app/model/security/roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listanegra',
  templateUrl: './listanegra.component.html',
  styleUrls: ['./listanegra.component.css']
})
export class ListanegraComponent implements OnInit {

  lista: ListaNegra[] = [];
  listaFiltrada: ListaNegra[] = [];
  listaPaginada: ListaNegra[] = [];

  filtroAdmin = '';
  paginaActual = 1;
  registrosPorPagina = 8;
  totalPaginas = 1;

  seleccionado: ListaNegra = new ListaNegra();
  esAdmin = false;
  modalVisible = false;

  telefonoBusqueda = '';
  prefijoBusqueda = '+51';
  resultadoBusqueda?: ListaNegra | null;

  prefijo = '+51';
  numeroLocal = '';

  mostrarInfo = false;

  private baseUrl = environment.base;

  constructor(
    private service: ListanegraService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`${this.baseUrl}/users/details`, { headers })
      .subscribe(res => {
        this.esAdmin = res.roles?.includes(Roles.ADMIN);
        if (this.esAdmin) {
          this.cargar();
        }
      });
  }

  cargar() {
    this.service.list().subscribe(data => {
      this.lista = data;
      this.listaFiltrada = data;
      this.actualizarPaginacion();
      this.service.setList(data);
    });
  }

  aplicarFiltroAdmin() {
    const texto = this.filtroAdmin.toLowerCase();

    this.listaFiltrada = this.lista.filter(item =>
      item.phone.toLowerCase().includes(texto) ||
      (item.motivo || '').toLowerCase().includes(texto)
    );

    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.listaFiltrada.length / this.registrosPorPagina);

    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;

    this.listaPaginada = this.listaFiltrada.slice(inicio, fin);
  }

  cambiarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
    this.actualizarPaginacion();
  }

  buscar() {
    if (!this.telefonoBusqueda.trim()) return;

    const numeroLimpio = this.telefonoBusqueda.replace(/\D/g, '');
    const phone = this.prefijoBusqueda + numeroLimpio;

    this.service.buscarPorPhone(phone).subscribe(
      res => this.resultadoBusqueda = res,
      () => this.resultadoBusqueda = null
    );
  }

  guardar(form: NgForm) {
    if (form.invalid || !this.numeroLocal.trim()) return;

    const confirmar = window.confirm(
      this.seleccionado.id === 0
        ? `¿Deseas añadir el número ${this.prefijo}${this.numeroLocal} a la lista negra?`
        : `¿Deseas actualizar el registro de ${this.prefijo}${this.numeroLocal}?`
    );

    if (!confirmar) return;

    const numeroLimpio = this.numeroLocal.replace(/\D/g, '');
    this.seleccionado.phone = this.prefijo + numeroLimpio;

    const request = this.seleccionado.id === 0
      ? this.service.insert(this.seleccionado)
      : this.service.update(this.seleccionado.id, this.seleccionado);

    request.subscribe(() => {
      this.cargar();
      this.seleccionado = new ListaNegra();
      this.prefijo = '+51';
      this.numeroLocal = '';
      form.resetForm({ prefijo: '+51' });
      this.cerrarModal();
    });
  }

  editar(item: ListaNegra) {
    const confirmar = window.confirm(`¿Deseas editar el registro del número ${item.phone}?`);
    if (!confirmar) return;

    this.prefijo = item.phone.substring(0, 3);
    this.numeroLocal = item.phone.substring(3);
    this.seleccionado = { ...item };
    this.modalVisible = true;
  }

  eliminar(id: number) {
    const confirmar = window.confirm('¿Deseas eliminar este registro?');
    if (!confirmar) return;

    this.service.delete(id).subscribe(() => this.cargar());
  }

  abrirModal(item?: ListaNegra) {
    this.seleccionado = item ? { ...item } : new ListaNegra();
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  cancelar(form: NgForm) {
    this.seleccionado = new ListaNegra();
    this.prefijo = '+51';
    this.numeroLocal = '';
    form.resetForm({ prefijo: '+51' });
    this.cerrarModal();
  }

}
