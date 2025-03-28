import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ColorService } from '../../services/colors/color.service';
import { LancamentoResourceService } from '../../services/services';
import { PageResponseLancamentoResponseDto } from '../../services/models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  standalone: false,
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrl: './lancamentos-pesquisa.component.css',
})
export class LancamentosPesquisaComponent {
  lancamentosResponse: PageResponseLancamentoResponseDto = {};
  pagesBack: any = [];
  lancamentos: any[] = [];
  page = 0;
  pageSize = 5;
  pages: any = [];
  descricao: string = '';
  dataVencimento: string = '';
  dataPagamento: string = '';
  lancamentoSelected: any = null;
  selectedIndex: any = null;
  constructor(
    private lancamentoService: LancamentoResourceService,
    public colorService: ColorService,
    private router: Router,
    private toastr: ToastrService,
    private title: Title
  ) {}
  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Lançamentos');
    this.findAllLancamentos();
  }
  getIndex(lancamento: any): number {
    if (!lancamento || !this.lancamentos) return -1;
    return this.lancamentos.findIndex((l) => l.codigo === lancamento.codigo);
  }
  openModal(lancamento: any, index: number) {
    this.lancamentoSelected = lancamento;
    this.selectedIndex = index;
  }
  getInitials(nome: any): string {
    if (!nome) return '';
    const nomes = nome.split(' ');
    const iniciais = nomes
      .slice(0, 2)
      .map((n: string) => n.charAt(0).toUpperCase());
    return iniciais.join('');
  }

  hasResults(): boolean {
    return this.lancamentos && this.lancamentos.length > 0;
  }

  findAllLancamentos() {
    this.lancamentoService
      .filtrar({
        descricao: this.descricao,
        dataVencimento: this.dataVencimento,
        dataPagamento: this.dataPagamento,
        page: this.page,
        size: this.pageSize,
      })
      .subscribe({
        next: (response) => {
          this.lancamentosResponse = response;
          this.lancamentos = response.content || [];

          this.pages = Array(this.lancamentosResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Erro ao carregar lançamentos!');
        },
      });
  }
  onCancel() {}

  deleteById(id: any) {
    this.lancamentoService
      .remover1({
        codigo: id,
      })
      .subscribe({
        next: (response) => {
          this.toastr.success('Lançamento removido com sucesso!');
          this.findAllLancamentos();
        },
        error: (error) => {
          this.toastr.error('Erro ao remover lançamento!');
          console.error(error);
        },
      });
  }
  getStatusClass(status: string): string {
    const statusLower = status.toLowerCase();
    if (statusLower === 'pago') {
      return 'status-paid';
    } else if (statusLower === 'atrasado') {
      return 'status-late';
    } else {
      return 'status-pending';
    }
  }
  goToCadastro() {
    this.router.navigate(['/lancamentos/cadastro']);
  }

  getValorClass(valor: any): string {
    return valor >= 0 ? 'text-money-600' : 'text-red-600';
  }

  formatarValor(valor: any): string {
    return valor >= 0
      ? `R$ ${Math.abs(valor).toFixed(2).replace('.', ',')}`
      : `- R$ ${Math.abs(valor).toFixed(2).replace('.', ',')}`;
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.findAllLancamentos();
  }
}
