import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private url = base_url;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  solicitarSubastador() {
    return this.http.post(
      `${this.url}/users/request-subastador`,
      {},
      { headers: this.getHeaders() }
    );
  }

  listarPendientes() {
    return this.http.get(
      `${this.url}/users/admin/subastadores-pendientes`,
      { headers: this.getHeaders() }
    );
  }

  aprobar(userId: number) {
    return this.http.post(
      `${this.url}/users/admin/approve/${userId}`,
      {},
      { headers: this.getHeaders() }
    );
  }

  rechazar(userId: number) {
    return this.http.post(
      `${this.url}/users/admin/reject/${userId}`,
      {},
      { headers: this.getHeaders() }
    );
  }
}
