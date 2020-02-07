import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CapitalPipe } from './capital.pipe';



@NgModule({
  entryComponents: [],
  declarations: [
    CapitalPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
  ], exports: [
    CapitalPipe
  ],
})

export class PipesModule { }
