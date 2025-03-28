/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Categoria } from '../../models/categoria';

export interface Criar2$Params {
      body: Categoria
}

export function criar2(http: HttpClient, rootUrl: string, params: Criar2$Params, context?: HttpContext): Observable<StrictHttpResponse<Categoria>> {
  const rb = new RequestBuilder(rootUrl, criar2.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Categoria>;
    })
  );
}

criar2.PATH = '/categorias';
