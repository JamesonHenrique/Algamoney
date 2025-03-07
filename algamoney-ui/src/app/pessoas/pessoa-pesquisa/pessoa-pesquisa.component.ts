import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa',
  imports: [CommonModule],
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrl: './pessoa-pesquisa.component.css'
})
export class PessoaPesquisaComponent {

  pessoas = [
    {
      pessoa: {
        nome: 'João da Silva',
        cidade: 'Sao Paulo',
        estado: 'SP',
      },
      status: 'Ativo',

    },
    {
      pessoa: {
        nome: 'João da Silva',
        cidade: 'Sao Paulo',
        estado: 'SP',
      },
      status: 'Ativo',

    },
    {
      pessoa: {
        nome: 'João da Silva',
        cidade: 'Sao Paulo',
        estado: 'SP',
      },
      status: 'Inativo',

    }

  ];
  isMobileMenuOpen = false;
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  page = 0;
  pageSize = 2;
  totalPages = Math.ceil(this.pessoas.length / this.pageSize);
  isLastPage = false;
  pages = Array.from({length: this.totalPages}, (_, i) => i);
result = Math.min((this.page + 1) * this.pageSize, this.pessoas.length);
  goToPage(page: number) {
    this.page = page;
    this.getPessoasPaginados();
  }

  goToFirstPage() {
    this.page = 0;
    this.getPessoasPaginados();
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.page--;
      this.getPessoasPaginados();
    }
  }

  goToLastPage() {
    this.page = this.totalPages - 1;
    this.getPessoasPaginados();
  }

  goToNextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getPessoasPaginados();
    }
  }

  getPessoasPaginados() {
    const inicio = this.page * this.pageSize;
    const fim = inicio + this.pageSize;

    return this.pessoas.slice(inicio, fim);
  }

  getStatusClass(status: string): string {
    const statusLower = status.toLowerCase();
    if (statusLower === 'ativo') {
      return 'status-paid';
    }
    else {
      return 'status-late';
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
