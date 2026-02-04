import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/model/security/userdata';
import { MydataService } from 'src/app/service/mydata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css']
})
export class MyDataComponent implements OnInit {

  user: UserData = new UserData();
  loading = true;
  error = '';
  closing = false;

  constructor(
    private mydataService: MydataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.loading = true;
    this.mydataService.getMyData().subscribe({
      next: data => {
        this.user = data;
        this.loading = false;
      },
      error: err => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  logout() {
    if (!confirm('¿Seguro que deseas cerrar sesión?')) return;

    this.closing = true;
    sessionStorage.clear();
    localStorage.clear();

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 600);
  }
}
