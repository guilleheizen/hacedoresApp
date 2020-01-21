import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanLoad {

  constructor() {}

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }
}
