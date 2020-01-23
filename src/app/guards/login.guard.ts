import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanLoad } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanLoad {

  constructor(
    private login: LoginService,
  ) {}

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    // HACER VALIDACIÓN
    return this.login.validarCredenciales();
  }

}
