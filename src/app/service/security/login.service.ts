import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, tap, from } from 'rxjs';
import { Registro } from 'src/app/model/security/registro';
import { JwtRequest } from 'src/app/model/security/jwtRequest';
import { UserData } from 'src/app/model/security/userdata';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.base;
  private userSubject: BehaviorSubject<Registro> = new BehaviorSubject<Registro>(new Registro());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(request: JwtRequest) {
    return this.http.post(`${this.baseUrl}/authenticate`, request);
  }

  verificar() {
    let token = sessionStorage.getItem("token");
    return token != null;
  }

  showRole(): string | null {
  const token = sessionStorage.getItem('token');
  if (!token) return null;

  const helper = new JwtHelperService();
  const decoded: any = helper.decodeToken(token);

  return decoded?.role ?? null;
}


  showUser() {
    let token = sessionStorage.getItem("token");
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.sub;
  }

  showName() {
    let token = sessionStorage.getItem("token");
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.name;
  }

  getUserDetails(): Observable<UserData> {
    let token = sessionStorage.getItem("token");
    if (token) {
      return this.http.get<UserData>(`${this.baseUrl}/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).pipe(tap(user => this.userSubject.next(user)));
    } else {
      return from(Promise.reject('No token found'));
    }
  }

}
