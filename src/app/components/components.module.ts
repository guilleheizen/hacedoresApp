import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { BuscarComponent } from './buscar/buscar.component';
import { EquipoComponent } from './equipo/equipo.component';


@NgModule({
  entryComponents: [],
  declarations: [
    MenuComponent,
    BuscarComponent,
    EquipoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
  ], exports: [
    MenuComponent,
    BuscarComponent,
    EquipoComponent
  ],
})

export class ComponentsModule { }
