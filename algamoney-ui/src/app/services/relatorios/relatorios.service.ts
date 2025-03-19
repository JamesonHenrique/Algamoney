import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private readonly lancamentosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.lancamentosUrl = `http://localhost:8080/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date): Observable<Blob> {
    const params = new HttpParams()
      .set('inicio', moment(inicio).format('YYYY-MM-DD'))
      .set('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, {
      params,
      responseType: 'blob'
    });
  }
}