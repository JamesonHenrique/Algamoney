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
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.lancamentoForm = this.fb.group({
      dataVencimento: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      tipo: [this.onTipoChange('RECEITA'), Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.min(0)]],
      categoria: this.fb.group({
        codigo: [null, Validators.required],
        nome: [],
      }),
      pessoa: this.fb.group({
        codigo: [null, Validators.required],
        nome: [],
      }),
      observacao: ['', Validators.required],
    });
    this.formulario = this.fb.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      vencimento: [null, Validators.required],
      pagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(3)]],
      valor: [null, Validators.required],
      pessoa: this.fb.group({
        codigo: [null, Validators.required],
        nome: [],
      }),
      categoria: this.fb.group({
        codigo: [null, Validators.required],
        nome: [],
      }),
      observacao: [],
    });
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
