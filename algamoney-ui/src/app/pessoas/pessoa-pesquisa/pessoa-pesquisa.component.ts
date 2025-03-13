import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PessoaResourceService } from '../../services/services';
import { PageResponsePessoaResponseDto } from '../../services/models';
import { ColorService } from '../../services/colors/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pessoa-pesquisa',
  standalone: false,
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrl: './pessoa-pesquisa.component.css',
})
export class PessoaPesquisaComponent {
  constructor(
    private pessoaService: PessoaResourceService,
    public colorService: ColorService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.findAllPessoas();
  }
  pessoaSelected: any = null;
  selectedIndex: any = null;
  pessoaResponse: PageResponsePessoaResponseDto = {};
  pagesBack: any = [];
  page = 0;
  pageSize = 4;

  pages: any = [];
  openModal(pessoa: any, index: number) {
    this.pessoaSelected = pessoa;
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
  onCancel() {}
  changeStatusPessoa(id: any) {
    if (!this.pessoaResponse || !this.pessoaResponse.content) {
      this.toastr.error(
        'Erro ao alterar status: resposta de pessoa não encontrada.'
      );
      return;
    }

    const pessoa = this.pessoaResponse.content.find((p) => p.codigo === id);
    const ativo = pessoa ? pessoa.ativo : false;

    this.pessoaService
      .atualizarPropriedadeAtivo({
        codigo: id,
        body: !ativo,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          if (ativo) {
            this.toastr.success('Status Desativado com sucesso!');
          } else {
            this.toastr.success('Status Ativado com sucesso!');
          }

          this.findAllPessoas();
        },
        error: (error) => {
          this.toastr.error('Erro ao alterar status!');
          console.error(error);
        },
      });
  }
  deleteById(id: any) {
    this.pessoaService
      .remover({
        codigo: id,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Pessoa removido com sucesso!');
          this.findAllPessoas();
        },
        error: (error) => {
          this.toastr.error('Erro ao remover Pessoa!');
          console.error(error);
        },
      });
  }
  findAllPessoas() {
    this.pessoaService
      .pesquisar({
        page: this.page,
        size: this.pageSize,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.pessoaResponse = response;
          this.pages = Array(this.pessoaResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
          console.log(this.pages);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  totalRegistros = 0;

  goToPage(page: number) {
    this.page = page;
    this.findAllPessoas();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllPessoas();
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.page--;
    }
    this.findAllPessoas();
  }

  goToLastPage() {
    this.page = (this.pessoaResponse.totalPages as number) - 1;
    this.findAllPessoas();
  }
  goToNextPage() {
    if (this.page < (this.pessoaResponse.totalPages ?? 0) - 1) {
      this.page++;
    }
    this.findAllPessoas();
  }

  get isLastPage() {
    return this.page === (this.pessoaResponse.totalPages as number) - 1;
  }

  getStatusClass(status: any): string {
    if (status) {
      return 'status-paid';
    } else {
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
