import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Registro } from 'src/app/model/security/registro';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private url = `${base_url}/register`
  constructor(private http: HttpClient) { }
  insert(cl: Registro) {
    return this.http.post<{ message: string }>(this.url, cl);
  }
  

}
