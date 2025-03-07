import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamentos-cadastro',
  imports: [CommonModule],
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrl: './lancamentos-cadastro.component.css'
})
export class LancamentosCadastroComponent {

  lancamentos = [
    {
      pessoa: {
        nome: 'João da Silva',
        iniciais: 'JD',
        corFundo: 'blue',
      },
      descricao: 'Salário mensal',
      vencimento: '05/06/2025',
      status: 'Pago',
      valor: 6500.0,
      tipo: 'receita',
    },
    {
      pessoa: {
        nome: 'Maria Costa',
        iniciais: 'MC',
        corFundo: 'purple',
      },
      descricao: 'Aluguel',
      vencimento: '10/06/2025',
      status: 'Atrasado',
      valor: -1200.0,
      tipo: 'despesa',
    },
    {
      pessoa: {
        nome: 'Jameson Henrique',
        iniciais: 'JH',
        corFundo: 'red',
      },
      descricao: 'Aluguel',
      vencimento: '10/06/2025',
      status: 'Pendente',
      valor: -1200.0,
      tipo: 'despesa',
    }, // ... outros lançamentos ...
  ];
  categorias = [
    { label: 'Alimentação', value: '1' },
    { label: 'Transporte', value: '2' },
    { label: 'Moradia', value: '3' },
    { label: 'Lazer', value: '4' },
    { label: 'Saúde', value: '5' },
    { label: 'Educação', value: '6' },
    { label: 'Salário', value: '7' },
    { label: 'Freelance', value: '8' },
    { label: 'Investimentos', value: '9' }
  ];
  pessoas = [
    { label: 'João da Silva', value: '1' },
    { label: 'Maria Costa', value: '2' },
    { label: 'Pedro Santos', value: '3' },
    { label: 'Ana Ferreira', value: '4' },
    { label: 'Roberto Lima', value: '5' },
  ];
  labelRecebimentoPagamento = 'Recebimento';

  onTipoChange(tipo: string) {
    console.log('Clicou em:', tipo);
    this.labelRecebimentoPagamento = tipo === 'receita' ? 'Recebimento' : 'Pagamento';
  }
  tipos = [
    { label: 'Receita', value: 'receita' },
    { label: 'Despesa', value: 'despesa' },
  ];
  isMobileMenuOpen = false;
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  page = 0;
  pageSize = 2;
  totalPages = Math.ceil(this.lancamentos.length / this.pageSize);
  isLastPage = false;
  pages = Array.from({length: this.totalPages}, (_, i) => i);
result = Math.min((this.page + 1) * this.pageSize, this.lancamentos.length);
  goToPage(page: number) {
    this.page = page;
    this.getLancamentosPaginados();
  }

  goToFirstPage() {
    this.page = 0;
    this.getLancamentosPaginados();
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.page--;
      this.getLancamentosPaginados();
    }
  }

  goToLastPage() {
    this.page = this.totalPages - 1;
    this.getLancamentosPaginados();
  }

  goToNextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getLancamentosPaginados();
    }
  }

  getLancamentosPaginados() {
    const inicio = this.page * this.pageSize;
    const fim = inicio + this.pageSize;

    return this.lancamentos.slice(inicio, fim);
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

  getValorClass(valor: number): string {
    return valor >= 0 ? 'text-money-600' : 'text-red-600';
  }

  formatarValor(valor: number): string {
    return valor >= 0
      ? `R$ ${Math.abs(valor).toFixed(2).replace('.', ',')}`
      : `- R$ ${Math.abs(valor).toFixed(2).replace('.', ',')}`;
  }
}
