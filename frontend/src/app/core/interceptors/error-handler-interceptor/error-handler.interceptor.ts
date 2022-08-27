import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../../services/snackbar/snack-bar.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBarService: SnackBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        if (error.status === 400) {
          this.snackBarService.showInfoMessage(error.error.message);
        } else if (error.status > 400) {
          this.snackBarService.showErrorMessage(error.error.message);
        }
        return throwError(() => errorMsg);
      })
    );
  }
}
