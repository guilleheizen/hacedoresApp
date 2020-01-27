import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  entryComponents: [],
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
  ], exports: [
    MenuComponent
  ],
})

export class ComponentsModule { }
