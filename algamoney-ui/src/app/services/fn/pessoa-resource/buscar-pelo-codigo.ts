/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PessoaResponseDto } from '../../models/pessoa-response-dto';

export interface BuscarPeloCodigo$Params {
  codigo: number;
}

export function buscarPeloCodigo(http: HttpClient, rootUrl: string, params: BuscarPeloCodigo$Params, context?: HttpContext): Observable<StrictHttpResponse<PessoaResponseDto>> {
  const rb = new RequestBuilder(rootUrl, buscarPeloCodigo.PATH, 'get');
  if (params) {
    rb.path('codigo', params.codigo, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PessoaResponseDto>;
    })
  );
}

buscarPeloCodigo.PATH = '/pessoas/{codigo}';
