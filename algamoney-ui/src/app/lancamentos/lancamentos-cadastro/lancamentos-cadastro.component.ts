import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {

  PageResponsePessoaResponseDto,
} from '../../services/models';
import {
  CategoriaResourceService,
  LancamentoResourceService,
  PessoaResourceService,
} from '../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-cadastro',
  standalone: false,
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrl: './lancamentos-cadastro.component.css',
})
export class LancamentosCadastroComponent {
  lancamentoForm!: FormGroup;
  formulario!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaResourceService,
    private pessoaService: PessoaResourceService,
    private lancamentoService: LancamentoResourceService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private title:Title
  ) {}
  ngOnInit(): void {
    this.title.setTitle('Cadastro de Lançamentos');
    this.lancamentoForm = this.fb.group({
      dataVencimento: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      tipo: [this.onTipoChange('RECEITA'), Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.min(0)]],
      categoria: this.fb.group({
        codigo: ['', Validators.required],
        nome: [],
      }),
      pessoa: this.fb.group({
        codigo: ['', Validators.required],
        nome: [],
      }),
      observacao: ['', Validators.required],
    });
    const lancamentoId = this.activatedRoute.snapshot.params['codigo'];
    if (lancamentoId) {
      this.lancamentoService
        .buscarPeloCodigo1({
          codigo: lancamentoId,
        })
        .subscribe({
          next: (lancamento) => {
            this.lancamentoForm.patchValue({
              dataVencimento: lancamento.dataVencimento,
              dataPagamento: lancamento.dataPagamento,
              tipo: lancamento.tipo,
              descricao: lancamento.descricao,
              valor: lancamento.valor,
              categoria: lancamento.categoria ? {
                codigo: lancamento.categoria.codigo,
                nome: lancamento.categoria.nome,
              } : {},
              pessoa: lancamento.pessoa ? {
                codigo: lancamento.pessoa.codigo,
                nome: lancamento.pessoa.nome,
              } : {},
              observacao: lancamento.observacao,
            });
          },
          error: (err) => {
            console.error('Erro ao buscar lançamento:', err);
            this.toastr.error('Erro ao buscar lançamento!');
          },
        });
    }

    this.findAllCategorias();
    this.findAllPessoas();
  }

  categoriasTest: any = [];

  labelRecebimentoPagamento = 'Recebimento';
  pessoaSelected: any = null;
  selectedIndex: any = null;
  pessoaResponse: PageResponsePessoaResponseDto = {};
  pagesBack: any = [];
  page = 0;
  pageSize = 4;
  pages: any = [];

  get editando(): boolean {
    return this.activatedRoute.snapshot.params['codigo'] !== undefined;
  }
  saveLancamento() {
    const lancamento = this.lancamentoForm.value;
    this.lancamentoService.criar1({ body: lancamento }).subscribe({
      next: (lancamentoId) => {
        this.router.navigate(['/lancamentos']);
        this.toastr.success('Lançamento salvo com sucesso!');
      },
      error: (err) => {
        console.log(err.error);
        this.toastr.error('Erro ao salvar lançamento!');
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

  findAllCategorias() {
    this.categoriaService.listar().subscribe({
      next: (response) => {
        this.categoriasTest = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  onTipoChange(tipo: string) {
    console.log('Clicou em:', tipo);
    this.labelRecebimentoPagamento =
      tipo === 'RECEITA' ? 'Recebimento' : 'Pagamento';
  }

  onSubmit(): void {
    if (this.lancamentoForm.valid) {
      this.saveLancamento();
    } else {
      this.lancamentoForm.markAllAsTouched();
      this.toastr.error('Formulário inválido!');
    }
  }
  get getErrors() {
    return this.lancamentoForm.controls;
  }
}
