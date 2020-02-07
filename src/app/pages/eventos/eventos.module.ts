import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventosPage } from './eventos.page';
import { ComponentsModule } from '../../components/components.module';
import { VerAccionComponent } from 'src/app/components/ver-accion/ver-accion.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    PipesModule,
    RouterModule.forChild([{ path: '', component: EventosPage }])
  ],
  declarations: [EventosPage],
  entryComponents: [VerAccionComponent]
})
export class EventosPageModule {}
