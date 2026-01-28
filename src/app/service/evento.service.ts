import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from '../model/evento';
import { Injectable } from '@angular/core';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private url = `${base_url}/eventos`;
  private listaCambio = new Subject<Evento[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Evento[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Evento[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(e: Evento) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, e, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  listId(id: number): Observable<Evento> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Evento>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  updateEstado(id: number, estado: string) {
  let token = sessionStorage.getItem('token');
  return this.http.put(
    `${this.url}/${id}/estado/${estado}`,
    {},
    {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }
  );
}

update(e: Evento) {
  let token = sessionStorage.getItem('token');
  return this.http.put(this.url, e, {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
  });
}

  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  setList(listaNueva: Evento[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  autoCerrar(id: number) {
  let token = sessionStorage.getItem('token');
  return this.http.put(
    `${this.url}/${id}/auto-cerrar`,
    {},
    {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }
  );
}

  private handleError(error: HttpErrorResponse) {
    let msg = 'Ocurrió un error desconocido';
    if (error.status === 409 || error.status === 500) {
      msg = 'No se puede eliminar: está vinculado a otros registros';
    }
    return throwError(msg);
  }
}
