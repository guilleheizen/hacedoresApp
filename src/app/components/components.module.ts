import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { BuscarComponent } from './buscar/buscar.component';


@NgModule({
  entryComponents: [],
  declarations: [
    MenuComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
  ], exports: [
    MenuComponent,
    BuscarComponent
  ],
})

export class ComponentsModule { }
