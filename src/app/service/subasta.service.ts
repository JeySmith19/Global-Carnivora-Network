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

  private getHeaders(json = true) {
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (json) headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  // ================= LISTADOS =================
  listMisSubastas(): Observable<Subasta[]> {
    return this.http.get<Subasta[]>(`${this.url}/mis-subastas`, { headers: this.getHeaders() });
  }

  listByEstado(estado: string): Observable<Subasta[]> {
    return this.http.get<Subasta[]>(`${this.url}/estado/${estado}`, { headers: this.getHeaders() });
  }

  listByEvento(idEvento: number): Observable<Subasta[]> {
    return this.http.get<Subasta[]>(`${this.url}/evento/${idEvento}`, { headers: this.getHeaders() });
  }

  getById(id: number) {
    return this.http.get<Subasta>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  // ================= INSERT / UPDATE =================
  insertFormData(formData: FormData) {
    // No Content-Type: angular lo pone automáticamente con multipart/form-data
    return this.http.post(this.url, formData, { headers: this.getHeaders(false) })
      .pipe(catchError(err => throwError(err)));
  }

  updateFormData(id: number, formData: FormData) {
    return this.http.put(`${this.url}/${id}`, formData, { headers: this.getHeaders(false) })
      .pipe(catchError(err => throwError(err)));
  }

  // ================= ESTADO =================
  updateEstado(id: number, estado: string) {
    return this.http.put(`${this.url}/${id}/estado/${estado}`, {}, { headers: this.getHeaders() });
  }

  // ================= ELIMINAR =================
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  // ================= OBSERVABLE =================
  setList(listaNueva: Subasta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listSubastadorPorEvento(eventoId: number): Observable<Subasta[]> {
  return this.http.get<Subasta[]>(`${this.url}/subastador/evento/${eventoId}`, { headers: this.getHeaders() });
}

}
