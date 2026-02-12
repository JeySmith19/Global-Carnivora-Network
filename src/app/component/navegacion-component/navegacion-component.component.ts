import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MydataService } from 'src/app/service/mydata.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navegacion-component',
  templateUrl: './navegacion-component.component.html',
  styleUrls: ['./navegacion-component.component.css']
})
export class NavegacionComponentComponent implements OnInit {
  user: any;
  showBackButton: boolean = false;

  // Solo añade aquí los paths donde NO quieres que aparezca el botón
  private rutasSinBoton: string[] = [
    '/components/xd',
    '/components/dashboard',
    '/components/inicio'
  ];

  constructor(
    private mydata: MydataService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Cargar datos del usuario
    this.mydata.getMyData().subscribe(d => {
      this.user = d;
    });

    // 2. Lógica para detectar la ruta y mostrar/ocultar el botón "Volver"
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Verificamos si la ruta actual coincide con alguna de la lista negra
      this.showBackButton = !this.rutasSinBoton.some(ruta => event.urlAfterRedirects.includes(ruta));
    });
  }

  go(path: string): void {
    this.router.navigate([path]);
  }
}