import { Component, OnInit, Input } from '@angular/core';
import { Accion } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ver-accion',
  templateUrl: './ver-accion.component.html',
  styleUrls: ['./ver-accion.component.scss'],
})
export class VerAccionComponent implements OnInit {
  @Input() accion: Accion;
  constructor(
    private modalCtrl: ModalController,
    private stor: StorageService
    ) { }
  
  ngOnInit() {
  }

  eliminar(){
    this.stor.eliminarAccion( this.accion );
    this.close();
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
