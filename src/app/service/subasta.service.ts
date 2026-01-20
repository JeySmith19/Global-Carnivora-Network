import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { Subasta } from '../model/subasta';
import { catchError } from 'rxjs/operators';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class SubastaService {

  private url = `${base_url}/subastas`;
  private listaCambio = new Subject<Subasta[]>();

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  listMisSubastas(): Observable<Subasta[]> {
    return this.http.get<Subasta[]>(`${this.url}/mis-subastas`, { headers: this.getHeaders() });
  }

  listByEstado(estado: string): Observable<Subasta[]> {
    return this.http.get<Subasta[]>(`${this.url}/estado/${estado}`, { headers: this.getHeaders() });
  }

  insert(s: Subasta) {
    return this.http.post(this.url, s, { headers: this.getHeaders() }).pipe(
      catchError(err => throwError(err))
    );
  }

  getById(id: number) {
    return this.http.get<Subasta>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  update(id: number, s: Subasta) {
    return this.http.put(`${this.url}/${id}`, s, { headers: this.getHeaders() });
  }

  updateEstado(id: number, estado: string) {
    return this.http.put(`${this.url}/${id}/estado/${estado}`, {}, { headers: this.getHeaders() });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  setList(listaNueva: Subasta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listByEvento(idEvento: number): Observable<Subasta[]> {
  return this.http.get<Subasta[]>(
    `${this.url}/evento/${idEvento}`,
    { headers: this.getHeaders() }
  );
}

}
