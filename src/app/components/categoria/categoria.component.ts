import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from 'src/app/pages/interfaces/interfaces';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  
  categoria: Categoria;
  @Input() id: string;
  
  constructor(
    private datos: DatosService
  ) { 
  }

  ngOnInit() {
    const posicion = this.datos.categorias.findIndex( eq => eq._id === this.id );
    this.categoria = this.datos.categorias[posicion];
  }

}
