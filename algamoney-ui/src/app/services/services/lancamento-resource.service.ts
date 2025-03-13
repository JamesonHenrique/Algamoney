/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { atualizar1 } from '../fn/lancamento-resource/atualizar-1';
import { Atualizar1$Params } from '../fn/lancamento-resource/atualizar-1';
import { buscarPeloCodigo1 } from '../fn/lancamento-resource/buscar-pelo-codigo-1';
import { BuscarPeloCodigo1$Params } from '../fn/lancamento-resource/buscar-pelo-codigo-1';
import { criar1 } from '../fn/lancamento-resource/criar-1';
import { Criar1$Params } from '../fn/lancamento-resource/criar-1';
import { filtrar } from '../fn/lancamento-resource/filtrar';
import { Filtrar$Params } from '../fn/lancamento-resource/filtrar';
import { LancamentoResponseDto } from '../models/lancamento-response-dto';
import { PageResponseLancamentoResponseDto } from '../models/page-response-lancamento-response-dto';
import { PageResumoLancamento } from '../models/page-resumo-lancamento';
import { remover1 } from '../fn/lancamento-resource/remover-1';
import { Remover1$Params } from '../fn/lancamento-resource/remover-1';
import { resumir } from '../fn/lancamento-resource/resumir';
import { Resumir$Params } from '../fn/lancamento-resource/resumir';

@Injectable({ providedIn: 'root' })
export class LancamentoResourceService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `buscarPeloCodigo1()` */
  static readonly BuscarPeloCodigo1Path = '/lancamentos/{codigo}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buscarPeloCodigo1()` instead.
   *
   * This method doesn't expect any request body.
   */
  buscarPeloCodigo1$Response(params: BuscarPeloCodigo1$Params, context?: HttpContext): Observable<StrictHttpResponse<LancamentoResponseDto>> {
    return buscarPeloCodigo1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `buscarPeloCodigo1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  buscarPeloCodigo1(params: BuscarPeloCodigo1$Params, context?: HttpContext): Observable<LancamentoResponseDto> {
    return this.buscarPeloCodigo1$Response(params, context).pipe(
      map((r: StrictHttpResponse<LancamentoResponseDto>): LancamentoResponseDto => r.body)
    );
  }

  /** Path part for operation `atualizar1()` */
  static readonly Atualizar1Path = '/lancamentos/{codigo}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `atualizar1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  atualizar1$Response(params: Atualizar1$Params, context?: HttpContext): Observable<StrictHttpResponse<LancamentoResponseDto>> {
    return atualizar1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `atualizar1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  atualizar1(params: Atualizar1$Params, context?: HttpContext): Observable<LancamentoResponseDto> {
    return this.atualizar1$Response(params, context).pipe(
      map((r: StrictHttpResponse<LancamentoResponseDto>): LancamentoResponseDto => r.body)
    );
  }

  /** Path part for operation `remover1()` */
  static readonly Remover1Path = '/lancamentos/{codigo}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remover1()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover1$Response(params: Remover1$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return remover1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remover1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover1(params: Remover1$Params, context?: HttpContext): Observable<void> {
    return this.remover1$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `filtrar()` */
  static readonly FiltrarPath = '/lancamentos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `filtrar()` instead.
   *
   * This method doesn't expect any request body.
   */
  filtrar$Response(params?: Filtrar$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseLancamentoResponseDto>> {
    return filtrar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `filtrar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  filtrar(params?: Filtrar$Params, context?: HttpContext): Observable<PageResponseLancamentoResponseDto> {
    return this.filtrar$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseLancamentoResponseDto>): PageResponseLancamentoResponseDto => r.body)
    );
  }

  /** Path part for operation `criar1()` */
  static readonly Criar1Path = '/lancamentos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `criar1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  criar1$Response(params: Criar1$Params, context?: HttpContext): Observable<StrictHttpResponse<LancamentoResponseDto>> {
    return criar1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `criar1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  criar1(params: Criar1$Params, context?: HttpContext): Observable<LancamentoResponseDto> {
    return this.criar1$Response(params, context).pipe(
      map((r: StrictHttpResponse<LancamentoResponseDto>): LancamentoResponseDto => r.body)
    );
  }

  /** Path part for operation `resumir()` */
  static readonly ResumirPath = '/lancamentos/resumir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resumir()` instead.
   *
   * This method doesn't expect any request body.
   */
  resumir$Response(params: Resumir$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResumoLancamento>> {
    return resumir(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resumir$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resumir(params: Resumir$Params, context?: HttpContext): Observable<PageResumoLancamento> {
    return this.resumir$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResumoLancamento>): PageResumoLancamento => r.body)
    );
  }

}
