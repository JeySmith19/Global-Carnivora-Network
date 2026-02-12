import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MydataService } from 'src/app/service/mydata.service';
import { Roles } from 'src/app/model/security/roles';

@Component({
  selector: 'app-home-general',
  templateUrl: './home-general.component.html',
  styleUrls: ['./home-general.component.css']
})
export class HomeGeneralComponent implements OnInit {
  user: any;

  constructor(private mydata: MydataService, private router: Router) {}

  ngOnInit(): void {
    this.mydata.getMyData().subscribe(d => this.user = d);
  }

  go(path: string) {
    this.router.navigate([path]);
  }

  isUser(): boolean {
    return this.user?.roles?.includes(Roles.USER) || 
           this.user?.roles?.includes(Roles.SUBASTADOR_PENDIENTE);
  }
}