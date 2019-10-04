import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  construct() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }
        if (error instanceof Error) {
            errorMessage = `error interceptado Error: ${error}`;
        }
        if (error instanceof HttpErrorResponse) {
            console.log('error interceptado HttpErrorResponse');
            errorMessage = `error interceptado HttpErrorResponse: ${error}`;
        }

        return throwError(errorMessage);
      })
    );
  }
}
