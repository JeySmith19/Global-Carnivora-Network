import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MydataService } from 'src/app/service/mydata.service';
import { LoginService } from 'src/app/service/security/login.service';
import { Roles } from 'src/app/model/security/roles';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navegacion-component',
  templateUrl: './navegacion-component.component.html',
  styleUrls: ['./navegacion-component.component.css']
})
export class NavegacionComponentComponent implements OnInit {
  user: any;
  userRole: string | null = null;
  showBackButton: boolean = false;

  private rutasSinBoton: string[] = [
    '/components/xd',
    '/components/dashboard',
    '/components/inicio'
  ];

  constructor(
    private mydata: MydataService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mydata.getMyData().subscribe(d => {
      this.user = d;
      this.userRole = this.loginService.showRole();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showBackButton = !this.rutasSinBoton.some(ruta => event.urlAfterRedirects.includes(ruta));
    });
  }

  isAdmin(): boolean {
    return this.userRole === Roles.ADMIN;
  }

  isSubastador(): boolean {
    return this.userRole === Roles.SUBASTADOR || this.userRole === Roles.ADMIN;
  }

  go(path: string): void {
    this.router.navigate([path]);
  }
}