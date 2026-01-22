import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subasta } from '../model/subasta';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  //private url = `${base_url}/admin`;
  private url = `${base_url}`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  listarSubastasEvento(eventoId: number) {
  return this.http.get<Subasta[]>(
    `${this.url}/subastas/evento/${eventoId}`,
    { headers: this.getHeaders() }
  );
}


  organizarSubastas(eventoId: number) {
    return this.http.post(
      `${this.url}/organizar-subastas/${eventoId}`,
      {},
      { headers: this.getHeaders() }
    );
  }

  decidirSubasta(id: number, estado: string) {
  return this.http.put(
    `${this.url}/subastas/${id}/decision/${estado}`,
    {},
    { headers: this.getHeaders() }
  );
}

}
