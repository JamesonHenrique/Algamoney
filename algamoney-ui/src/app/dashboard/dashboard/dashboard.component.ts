import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DateTime } from 'luxon';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  pieChartData: any;
  lineChartData: any;
  topCategorias: any[] = [];
  categorias: any[] = [];
  sortBy: string = 'valor';
  sortDirection: 'asc' | 'desc' = 'desc';
  estatisticasDiarias: any = {};
  mediaDiaria = { receitas: 0, despesas: 0, percentualDespesas: 0, receitasFormatada: '0,00', despesasFormatada: '0,00' };
  tendencia = { percentual: 0, texto: '', tipo: '' };
  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) {
    Chart.register(...registerables);
  }

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? dataset.label + ': ' : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        },
      },
    },
  };

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
    this.carregarTopCategorias();
    this.carregarCategorias();
  }
  carregarCategorias() {
    this.dashboardService.lancamentosPorCategoria().subscribe(dados => {
      const totalGeral = dados.reduce((sum, item) => sum + Math.abs(item.total), 0);

      this.categorias = dados.map(item => {
        const isReceita = item.total >= 0;
        const valorAbsoluto = Math.abs(item.total);
        const porcentagem = (valorAbsoluto / totalGeral) * 100;

        return {
          id: item.categoria.codigo,
          nome: item.categoria.nome,
          tipo: isReceita ? 'Receita' : 'Despesa',
          valor: valorAbsoluto,
          valorFormatado: this.decimalPipe.transform(valorAbsoluto, '1.2-2'),
          porcentagem: porcentagem,
          porcentagemFormatada: porcentagem.toFixed(1) + '%',
          cor: this.getCorPorCategoria(item.categoria.codigo),
          icone: this.getIconePorCategoria(item.categoria.codigo)
        };
      });

      this.ordenarCategorias();
    });
  }

  ordenarCategorias() {
    this.categorias.sort((a, b) => {
      let comparison = 0;

      if (this.sortBy === 'nome') {
        comparison = a.nome.localeCompare(b.nome);
      } else {
        comparison = a.valor - b.valor;
      }

      return this.sortDirection === 'desc' ? -comparison : comparison;
    });
  }

  toggleSort(campo: string) {
    if (this.sortBy === campo) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = campo;
      this.sortDirection = 'desc';
    }

    this.ordenarCategorias();
  }

  private getCorPorCategoria(codigo: number): string {
    const cores = ['#FF9900', '#990099', '#109618', '#3B3EAC', '#0099C6'];
    return cores[codigo % cores.length];
  }

  private getIconePorCategoria(codigo: number): string {
    const icones = [
      'fa-money-bill-wave',
      'fa-laptop-code',
      'fa-home',
      'fa-utensils',
      'fa-chart-line'
    ];
    return icones[codigo % icones.length];
  }
  carregarTopCategorias() {
    this.dashboardService.lancamentosPorCategoria().subscribe(dados => {
      const sorted = [...dados].sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

      this.topCategorias = sorted.slice(0, 5).map((item, index) => {
        const isReceita = item.total >= 0;
        const colors = ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6'];

        return {
          nome: item.categoria.nome,
          valor: Math.abs(item.total),
          valorFormatado: this.decimalPipe.transform(Math.abs(item.total), '1.2-2'),
          cor: colors[index],
          tipo: isReceita ? 'receita' : 'despesa',
          porcentagem: this.calcularPorcentagem(item.total, dados)
        };
      });
    });
  }

  private calcularPorcentagem(valor: number, todosDados: any[]): number {
    const maxValor = Math.max(...todosDados.map(d => Math.abs(d.total)));
    return (Math.abs(valor) / maxValor) * 100;
  }
  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria().subscribe((dados) => {
      this.pieChartData = {
        labels: dados.map((dado) => dado.categoria.nome),
        datasets: [
          {
            data: dados.map((dado) => dado.total),
            backgroundColor: [
              '#FF9900',
              '#109618',
              '#990099',
              '#3B3EAC',
              '#0099C6',
              '#DD4477',
              '#3366CC',
              '#DC3912',
            ],
          },
        ],
      };
      this.setupCategoriasChart();
    });
  }
  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia().subscribe((dados) => {
      const diasDoMes = this.configurarDiasMes();
      const receitas = dados.filter(dado => dado.tipo === 'RECEITA');
      const despesas = dados.filter(dado => dado.tipo === 'DESPESA');

      // Processa os dados para o gráfico
      const totaisReceitas = this.totaisPorCadaDiaMes(receitas, diasDoMes);
      const totaisDespesas = this.totaisPorCadaDiaMes(despesas, diasDoMes);

      // Configura estatísticas diárias
      this.calcularEstatisticasDiarias(receitas, despesas);

      // Configura o gráfico
      this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          { label: 'Receitas', data: totaisReceitas, borderColor: '#3366CC' },
          { label: 'Despesas', data: totaisDespesas, borderColor: '#D62B00' }
        ]
      };

      this.setupLancamentosDiaChart();
    });
  }

  private calcularEstatisticasDiarias(receitas: any[], despesas: any[]) {

    const maiorReceita = [...receitas].sort((a, b) => b.total - a.total)[0];

    const maiorDespesa = [...despesas].sort((a, b) => b.total - a.total)[0];


    const totalReceitas = receitas.reduce((sum, item) => sum + item.total, 0);
    const totalDespesas = despesas.reduce((sum, item) => sum + item.total, 0);
    const diasNoMes = new Date().getDate();


    const tendenciaPercentual = 8;

    this.estatisticasDiarias = {
      maiorReceita: {
        data: maiorReceita ? this.formatarData(maiorReceita.dia) : 'N/A',
        valor: maiorReceita ? maiorReceita.total : 0,
        valorFormatado: this.decimalPipe.transform(maiorReceita?.total || 0, '1.2-2')
      },
      maiorDespesa: {
        data: maiorDespesa ? this.formatarData(maiorDespesa.dia) : 'N/A',
        valor: maiorDespesa ? maiorDespesa.total : 0,
        valorFormatado: this.decimalPipe.transform(maiorDespesa?.total || 0, '1.2-2')
      }
    };

    this.mediaDiaria = {
      receitas: totalReceitas / diasNoMes,
      despesas: totalDespesas / diasNoMes,
      receitasFormatada: this.decimalPipe.transform(totalReceitas / diasNoMes, '1.2-2')!,
      despesasFormatada: this.decimalPipe.transform(totalDespesas / diasNoMes, '1.2-2')!,
      percentualDespesas: (totalDespesas / totalReceitas) * 100
    };

    this.tendencia = {
      percentual: tendenciaPercentual,
      texto: tendenciaPercentual >= 0 ?
        `+${tendenciaPercentual}% nas receitas` :
        `${tendenciaPercentual}% nas receitas`,
      tipo: tendenciaPercentual >= 0 ? 'crescimento' : 'queda'
    };
  }

  private formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR');
  }

  private totaisPorCadaDiaMes(dados: any, diasDoMes: any) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;

          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

  ngAfterViewInit(): void {
    this.setupTabs();
    this.setupCharts();
    this.setupFiltersAndSorting();
  }

  private setupTabs(): void {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        tabButtons.forEach((btn) => btn.classList.remove('active'));

        button.classList.add('active');

        tabContents.forEach((content) => content.classList.add('hidden'));

        const tabId = button.getAttribute('data-tab');
        const selectedTabContent = document.getElementById(`${tabId}-content`);
        if (selectedTabContent) {
          selectedTabContent.classList.remove('hidden');
        }
      });
    });
  }

  private setupCharts(): void {
    this.setupCategoriasChart();
    this.setupLancamentosDiaChart();
  }

  private setupCategoriasChart(): void {
    const categoriasCtx = (
      document.getElementById('categoriasChart') as HTMLCanvasElement
    )?.getContext('2d');
    if (categoriasCtx && this.pieChartData) {
      new Chart(categoriasCtx, {
        type: 'doughnut',
        data: {
          labels: this.pieChartData.labels,
          datasets: [
            {
              data: this.pieChartData.datasets[0].data,
              backgroundColor: this.pieChartData.datasets[0].backgroundColor,
              borderWidth: 0,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce(
                    (acc, data) => acc + data,
                    0
                  );
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: R$ ${value.toLocaleString(
                    'pt-BR'
                  )} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    }
  }
  private setupLancamentosDiaChart(): void {
    const lancamentosDiaCtx = (
      document.getElementById('lancamentosDiaChart') as HTMLCanvasElement
    )?.getContext('2d');
    if (lancamentosDiaCtx && this.lineChartData) {
      new Chart(lancamentosDiaCtx, {
        type: 'line',
        data: {
          labels: this.lineChartData.labels,
          datasets: [
            {
              label: 'Receitas',
              data: this.lineChartData.datasets[0].data,
              backgroundColor: 'rgba(51, 102, 204, 0.1)',
              borderColor: '#3366CC',
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#3366CC',
            },
            {
              label: 'Despesas',
              data: this.lineChartData.datasets[1].data,
              backgroundColor: 'rgba(214, 43, 0, 0.1)',
              borderColor: '#D62B00',
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#D62B00',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false },
              title: { display: true, text: 'Dia do Mês' },
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value: any) => {
                  const numValue = Number(value);
                  if (numValue === 0) return 'R$ 0';
                  if (numValue >= 1000) return `R$ ${numValue / 1000}k`;
                  return `R$ ${numValue}`;
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';
                  if (label) label += ': ';
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(context.parsed.y);
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    }
  }

  private setupFiltersAndSorting(): void {
    document.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        console.log(`Filtro aplicado: ${filter}`);
      });
    });

    document
      .querySelectorAll('#sort-valor, #sort-nome, #sort-data, #sort-valor-dia')
      .forEach((button) => {
        button.addEventListener('click', () => {
          console.log(`Ordenação aplicada: ${button.id}`);
        });
      });
  }
}
