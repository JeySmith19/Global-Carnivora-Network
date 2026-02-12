import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MydataService } from 'src/app/service/mydata.service';
import { LoginService } from 'src/app/service/security/login.service';
import { Roles } from 'src/app/model/security/roles';

@Component({
  selector: 'app-home-general',
  templateUrl: './home-general.component.html',
  styleUrls: ['./home-general.component.css']
})
export class HomeGeneralComponent implements OnInit {
  user: any;
  userRole: string | null = null;
  today: Date = new Date();

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
  }

  go(path: string): void {
    this.router.navigate([path]);
  }

  isAdmin(): boolean {
    return this.userRole === Roles.ADMIN;
  }

  isSubastador(): boolean {
    return this.userRole === Roles.SUBASTADOR || this.userRole === Roles.ADMIN;
  }

  isSoloUser(): boolean {
    return this.userRole === Roles.USER || this.userRole === Roles.SUBASTADOR_PENDIENTE;
  }
}