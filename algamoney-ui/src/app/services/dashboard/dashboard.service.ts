import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import  moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `http://localhost:8080/lancamentos`;
  }

  /**
   * Obtém os lançamentos agrupados por categoria.
   * @returns Observable com a lista de lançamentos por categoria.
   */
  lancamentosPorCategoria(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .pipe(
        map((response) => response) // Pode adicionar transformações aqui, se necessário
      );
  }

  /**
   * Obtém os lançamentos agrupados por dia.
   * @returns Observable com a lista de lançamentos por dia, com as datas convertidas para objetos Date.
   */
  lancamentosPorDia(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .pipe(
        map((dados) => this.converterStringsParaDatas(dados))
      );
  }

  /**
   * Converte as strings de data no formato 'YYYY-MM-DD' para objetos Date.
   * @param dados Lista de lançamentos por dia.
   * @returns Lista de lançamentos com as datas convertidas.
   */
  private converterStringsParaDatas(dados: any[]): any[] {
    return dados.map((dado) => ({
      ...dado,
      dia: moment(dado.dia, 'YYYY-MM-DD').toDate(),
    }));
  }
}