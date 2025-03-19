import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {}
  private isRefreshing = false;
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.token;


    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(authReq).pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
  private addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.tokenService.renewToken().pipe(
        switchMap((response) => {
          this.isRefreshing = false;
          request = this.addTokenToRequest(request, response.token);
          return next.handle(request);
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.tokenService.logout();
          this.router.navigate(['/login']);
          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }
}
