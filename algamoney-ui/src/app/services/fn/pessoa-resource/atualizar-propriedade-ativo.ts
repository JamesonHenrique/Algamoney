/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AtualizarPropriedadeAtivo$Params {
  codigo: number;
    body: boolean
}

export function atualizarPropriedadeAtivo(http: HttpClient, rootUrl: string, params: AtualizarPropriedadeAtivo$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, atualizarPropriedadeAtivo.PATH, 'put');
  if (params) {
    rb.path('codigo', params.codigo, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

atualizarPropriedadeAtivo.PATH = '/pessoas/{codigo}/ativo';
