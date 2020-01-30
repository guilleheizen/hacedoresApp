import { Component, OnInit, Input } from '@angular/core';
import { Categoria, Actividad } from '../../pages/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {

  @Input() categoria: Categoria;

  actividades: Actividad[];

  constructor(
    private modalCtrl: ModalController,
    private datos: DatosService
  ) { }

  ngOnInit() {
    this.actividades = this.datos.actividades.filter( (bsq) => bsq.categoria === this.categoria._id);
  }

  buscar( palabra: string) {

  }

  async close() {
    await this.modalCtrl.dismiss();
  }

}
