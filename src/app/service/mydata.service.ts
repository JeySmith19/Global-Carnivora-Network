import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserData } from '../model/security/userdata';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MydataService {

  private url = `${base_url}/mydata`;
  private userChange = new Subject<UserData>();

  constructor(private http: HttpClient) { }

  getMyData(): Observable<UserData> {
    let token = sessionStorage.getItem('token');
    return this.http.get<UserData>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    }).pipe(
      catchError(this.handleError)
    );
  }

  setUserChange(user: UserData) {
    this.userChange.next(user);
  }

  getUserChange(): Observable<UserData> {
    return this.userChange.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    let msg = 'Ocurrió un error desconocido';
    if (error.status === 401) {
      msg = 'No autorizado';
    } else if (error.status === 404) {
      msg = 'Usuario no encontrado';
    }
    return throwError(() => msg);
  }
}
