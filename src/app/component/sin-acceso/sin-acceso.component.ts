import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sin-acceso',
  templateUrl: './sin-acceso.component.html',
  styleUrls: ['./sin-acceso.component.css']
})
export class SinAccesoComponent {

  constructor(private router: Router) { }

  volverHome() {
    this.router.navigate(['/']);
  }

}