import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RelatoriosService } from '../../services/relatorios/relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  standalone: false,
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrl: './relatorio-lancamentos.component.css',
})
export class RelatorioLancamentosComponent {
  periodoInicio?: Date;
  periodoFim?: Date;

  constructor(private relatoriosService: RelatoriosService, private title:Title) {}

  ngOnInit() {
    this.title.setTitle('Relatório de Lançamentos');
  }

  gerar() {
    this.relatoriosService
      .relatorioLancamentosPorPessoa(this.periodoInicio!, this.periodoFim!)
      .subscribe((relatorio) => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }
}
