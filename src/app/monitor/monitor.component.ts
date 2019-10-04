import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retryWhen } from 'rxjs/operators';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['monitor.component.scss'],
})

export class MonitorComponent implements OnInit {

  @ViewChild('santiago', {static: true}) santiago;
  @ViewChild('zurich', {static: true}) zurich;
  @ViewChild('auckland', {static: true}) auckland;
  @ViewChild('sydney', {static: true}) sydney;
  @ViewChild('londres', {static: true}) londres;
  @ViewChild('georgia', {static: true}) georgia;
  ciudades = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  this.http.get(environment.urlApi + 'ini').pipe(
      retryWhen(_ => interval(500) ))
      .subscribe((result) => {
      console.log('Save successful');
    }, (err) => {
      console.log(err);
    });

  this.http.get(environment.urlApi + 'saveForecast').subscribe((result: IForecast) => {
      this.ciudades = result.ciudades;
      this.setCiudades();
      console.log(this.ciudades);
    }, (err) => {
      console.log('error getting cities information: ' + err);
    });

  }

  setCiudades() {
    this.santiago.nombre = this.ciudades[0].nombre;
    this.santiago.latitud = this.ciudades[0].latitud;
    this.santiago.longitud = this.ciudades[0].longitud;

    this.zurich.nombre = this.ciudades[1].nombre;
    this.zurich.latitud = this.ciudades[1].latitud;
    this.zurich.longitud = this.ciudades[1].longitud;

    this.auckland.nombre = this.ciudades[2].nombre;
    this.auckland.latitud = this.ciudades[2].latitud;
    this.auckland.longitud = this.ciudades[2].longitud;

    this.sydney.nombre = this.ciudades[3].nombre;
    this.sydney.latitud = this.ciudades[3].latitud;
    this.sydney.longitud = this.ciudades[3].longitud;

    this.londres.nombre = this.ciudades[4].nombre;
    this.londres.latitud = this.ciudades[4].latitud;
    this.londres.longitud = this.ciudades[4].longitud;

    this.georgia.nombre = this.ciudades[5].nombre;
    this.georgia.latitud = this.ciudades[5].latitud;
    this.georgia.longitud = this.ciudades[5].longitud;

    this.santiago.run();
    this.zurich.run();
    this.auckland.run();
    this.sydney.run();
    this.londres.run();
    this.georgia.run();
  }
}

export interface IForecast {
  ciudades: any [];
}
