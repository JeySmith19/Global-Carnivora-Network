import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/security/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from 'src/app/model/security/jwtRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }
  username: string = ""
  password: string = ""
  mensaje: string = ""

  ngOnInit(): void { }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe((data: any) => {
      console.log('Token recibido:', data.jwttoken);
      console.log('Username recibido:', data.username);
      console.log('Rol recibido:', data.rol);
      sessionStorage.setItem("token", data.jwttoken);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("rol", data.rol);
      this.loginService.getUserDetails().subscribe(() => {
        this.router.navigate(['components/ver-subastas']);
      });
    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    });
  }

}
