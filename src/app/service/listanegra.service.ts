import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { ListaNegra } from '../model/listanegra';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ListanegraService {

  private url = `${base_url}/lista-negra`;
  private listaCambio = new Subject<ListaNegra[]>();

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  list(): Observable<ListaNegra[]> {
    return this.http.get<ListaNegra[]>(this.url, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<ListaNegra> {
    return this.http.get<ListaNegra>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  buscarPorPhone(phone: string): Observable<ListaNegra> {
    return this.http.get<ListaNegra>(
      `${this.url}/buscar?phone=${encodeURIComponent(phone)}`,
      { headers: this.getHeaders() }
    );
  }

  insert(listaNegra: ListaNegra) {
    return this.http.post(this.url, listaNegra, { headers: this.getHeaders() });
  }

  update(id: number, listaNegra: ListaNegra) {
    return this.http.put(`${this.url}/${id}`, listaNegra, { headers: this.getHeaders() });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  setList(listaNueva: ListaNegra[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
