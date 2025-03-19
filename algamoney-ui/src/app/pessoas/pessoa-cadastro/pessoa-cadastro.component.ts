import { Component } from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from '../../shared/messages/messages.component';
import { ToastrService } from 'ngx-toastr';
import { PessoaResourceService } from '../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Contato, PageResponsePessoaResponseDto, Pessoa, PessoaRequestDto } from '../../services/models';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: false,
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.css',
})
export class PessoaCadastroComponent {

  pessoa: PessoaRequestDto = {
    ativo: true, 
    endereco: {  },
    nome: '',
    contatos: []
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private pessoaService: PessoaResourceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Pessoas');
    this.findAllPessoas();
    this.loadPessoaIfEditing();
  }




  loadPessoaIfEditing(): void {
    const pessoaId = this.activatedRoute.snapshot.params['codigo'];
    if (pessoaId) {
      this.pessoaService.buscarPeloCodigo({ codigo: pessoaId }).subscribe({
        next: (pessoa) => {
          this.pessoa = pessoa as PessoaRequestDto;
        },
        error: (err) => {
          console.error('Erro ao buscar pessoa:', err);
          this.toastr.error('Erro ao buscar pessoa!');
        },
      });
    }
  }



  pessoas: any[] = [];
  pessoaSelected: any = null;
  selectedIndex: any = null;
  pessoaResponse: PageResponsePessoaResponseDto = {};
  pagesBack: any = [];
  page = 0;
  pageSize = 5;

  pages: any = [];

  findAllPessoas() {
    this.pessoaService
      .pesquisar({
        page: this.page,
        size: this.pageSize,
      })
      .subscribe({
        next: (response) => {
          this.pessoas = response.content || [];
          this.pessoaResponse = response;

          this.pages = Array(this.pessoaResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  estados = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
  ];


  get editando(): boolean {
    return this.activatedRoute.snapshot.params['codigo'] !== undefined;
  }

  savePessoa() {
    console.log(this.pessoa);
    this.pessoaService.criar({ body: this.pessoa }).subscribe({
      next: (pessoaId) => {
        this.router.navigate(['/pessoas']);
        this.toastr.success('Pessoa salva com sucesso!');
      },
      error: (err) => {
        console.log(err.error);
        this.toastr.error('Erro ao salvar pessoa!');
      },
    });
  }

  updatePessoa(codigo: any) {
    this.pessoaService.atualizar({ codigo, body: this.pessoa }).subscribe({
      next: (pessoaId) => {
        this.router.navigate(['/pessoas']);
        this.toastr.success('Pessoa atualizada com sucesso!');
      },
      error: (err) => {
        console.log(err.error);
        this.toastr.error('Erro ao atualizar pessoa!');
      },
    });
  }
  handleZipCode(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    input.value = this.zipCodeMask(input.value);
  }

  zipCodeMask(value: string): string {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
  }

  onSubmit(): void {

    const pessoaId = this.activatedRoute.snapshot.params['codigo'];
    if (pessoaId) {
      this.updatePessoa(pessoaId);
    } else {
      this.savePessoa();
    }
  }
  tabChange(event: Event) {
    const button = event.currentTarget as HTMLButtonElement;
    const tab = button.dataset['tab'];

    document.querySelectorAll('.tab-item, .tab-content').forEach((element) => {
      element.classList.remove('active');
    });

    button.classList.add('active');

    const activeTabContent = document.querySelector(
      `.tab-content[data-tab="${tab}"]`
    );
    if (activeTabContent) {
      activeTabContent.classList.add('active');
    } else {
      console.error(`Tab content with data-tab="${tab}" not found.`);
    }
  }
}
