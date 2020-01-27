
import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-acciones',
  templateUrl: 'acciones.page.html',
  styleUrls: ['acciones.page.scss']
})
export class AccionesPage {

  constructor( public st: LoginService) {}

}
