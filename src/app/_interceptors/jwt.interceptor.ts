import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        // Set authorization header
        'x-api-key': `Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse`
      }
    });
    return next.handle(request);
  }
}
