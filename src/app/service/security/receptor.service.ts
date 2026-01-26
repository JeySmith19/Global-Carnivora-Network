import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ReceptorService implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          sessionStorage.removeItem('token');
          this.snackBar.open('Tu sesión ha expirado. Por favor inicia sesión de nuevo.', 'Cerrar', {
            duration: 5000
          });
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}