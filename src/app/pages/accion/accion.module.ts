import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccionPageRoutingModule } from './accion-routing.module';

import { AccionPage } from './accion.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccionPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [AccionPage]
})
export class AccionPageModule {}
