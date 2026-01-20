import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  private url = `${base_url}/admin`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  organizarSubastas(eventoId: number) {
    return this.http.post(
      `${this.url}/organizar-subastas/${eventoId}`,
      {},
      { headers: this.getHeaders() }
    );
  }
}
