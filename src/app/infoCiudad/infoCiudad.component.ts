import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { retryWhen } from 'rxjs/operators';
import { interval, throwError } from 'rxjs';

@Component({
  selector: 'app-info-ciudad',
  templateUrl: './infoCiudad.component.html',
  styleUrls: ['infoCiudad.component.scss'],
})

export class InfoCiudadComponent {
  nombre = '';
  hora;
  temperatura = '';
  latitud = '';
  longitud = '';
  urlForest = environment.proxy + environment.urlForest + environment.keyForest;

  response: Observable<any>;

  constructor(private http: HttpClient) { }

  run() {
    this.GetForecast(this.latitud, this.longitud).pipe(
      retryWhen(_ => interval(500) ))
      .subscribe((result) => {
      this.hora = new Date(parseFloat(result.currently.time) * 1000);
      if (this.nombre !== 'Santiago') {
        this.hora.setHours(this.hora.getHours() + result.offset);
      }
      this.temperatura = result.currently.apparentTemperature;
    }, (err) => {
      console.log('error provocado: ' + err);
    }, () => {
      console.log('HttpErrorResponse llega aqui');
    });
  }

  GetForecast(latitud, longitud): Observable<any> {
    if (Math.random() < 0.1) { return throwError(new HttpErrorResponse({})); }
    return this.http.get(this.urlForest + latitud + ',' + longitud);
  }

}
