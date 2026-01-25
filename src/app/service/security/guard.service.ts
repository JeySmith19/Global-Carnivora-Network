import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { Roles } from 'src/app/model/security/roles';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private lService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLogged = this.lService.verificar();
    if (!isLogged) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles: string[] = route.data['roles'];
    const userRole = this.lService.showRole();

    if (expectedRoles && (!userRole || !expectedRoles.includes(userRole))) {
      this.router.navigate(['/components/no-autorizado']);
      return false;
    }

    return true;
  }
}