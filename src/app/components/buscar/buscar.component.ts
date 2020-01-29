import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from '../../pages/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {

  @Input() categoria: Categoria;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async close() {
    await this.modalCtrl.dismiss();
  }

}
