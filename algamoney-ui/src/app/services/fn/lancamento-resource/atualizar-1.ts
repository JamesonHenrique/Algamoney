/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LancamentoRequestDto } from '../../models/lancamento-request-dto';
import { LancamentoResponseDto } from '../../models/lancamento-response-dto';

export interface Atualizar1$Params {
  codigo: number;
      body: LancamentoRequestDto
}

export function atualizar1(http: HttpClient, rootUrl: string, params: Atualizar1$Params, context?: HttpContext): Observable<StrictHttpResponse<LancamentoResponseDto>> {
  const rb = new RequestBuilder(rootUrl, atualizar1.PATH, 'put');
  if (params) {
    rb.path('codigo', params.codigo, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LancamentoResponseDto>;
    })
  );
}

atualizar1.PATH = '/lancamentos/{codigo}';
