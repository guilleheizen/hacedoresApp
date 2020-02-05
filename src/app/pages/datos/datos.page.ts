import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { Chart } from 'chart.js';
import { Equipo } from '../interfaces/interfaces';

@Component({
  selector: 'app-datos',
  templateUrl: 'datos.page.html',
  styleUrls: ['datos.page.scss']
})
export class DatosPage implements OnInit{

  @ViewChild('barCanvas', { static: true }) barCanvas: ElementRef;

  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas: ElementRef;

  private barChart: Chart;

  labels: string[] = [];
  colores: string[] = [];
  valores: number[] = [];
  sanciones: number[] = [];

  constructor(
    public datos: DatosService
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.cargarVariables();
  }
  async cargarVariables() {
    this.labels = [];
    this.colores = [];
    this.valores = [];
    this.sanciones = [];

    await this.datos.cargarVariables();

    this.cargarPuntos();
    this.cargarSanciones();

    this.cargarDatos();

  }

  cargarPuntos() {
    this.datos.equipos.forEach( e => {
      this.labels.push(e.nombre);
      this.colores.push(e.color);
      const acciones = this.datos.acciones.filter( (bsq) => ( bsq.equipo === e._id ));
      const valores = acciones.reduce((sum, ac) => (ac.valor === 'positivo' ? sum + ac.puntos : sum - ac.puntos ), 0);
      this.valores.push(valores);
    });
  }

  cargarSanciones() {
    this.datos.equipos.forEach( e => {
      const acciones = this.datos.acciones.filter( (bsq) => ( bsq.equipo === e._id && bsq.valor === 'negativo' ));
      const sanciones = acciones.reduce((sum, ac) => (ac.valor === 'negativo' ? sum + ac.puntos : sum ), 0);
      this.sanciones.push(sanciones);
    });
  }

  cargarDatos() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Puntos',
            data: this.valores,
            backgroundColor: this.colores,
            borderColor: this.colores,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.barChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Sanciones',
            data: this.sanciones,
            backgroundColor: this.colores,
            borderColor: this.colores,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
