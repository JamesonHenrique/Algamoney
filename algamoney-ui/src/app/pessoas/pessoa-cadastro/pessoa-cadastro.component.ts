import { Component } from '@angular/core';

import {
  FormBuilder,
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

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: false,
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.css',
})
export class PessoaCadastroComponent {
  pessoaForm!: FormGroup;

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
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      ativo: [true, Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['', Validators.required],
        bairro: ['', Validators.required],
        cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
      }),
    });

    const pessoaId = this.activatedRoute.snapshot.params['codigo'];

    if (pessoaId) {
      this.pessoaService
        .buscarPeloCodigo({
          codigo: pessoaId,
        })
        .subscribe({
          next: (pessoa) => {
            this.pessoaForm.patchValue({
              nome: pessoa.nome,
              ativo: pessoa.ativo,
              endereco: pessoa.endereco
                ? {
                    logradouro: pessoa.endereco.logradouro,
                    numero: pessoa.endereco.numero,
                    complemento: pessoa.endereco.complemento,
                    bairro: pessoa.endereco.bairro,
                    cep: pessoa.endereco.cep,
                    cidade: pessoa.endereco.cidade,
                    estado: pessoa.endereco.estado,
                  }
                : {},
            });
          },
          error: (err) => {
            console.error('Erro ao buscar pessoa:', err);
            this.toastr.error('Erro ao buscar pessoa!');
          },
        });
    }
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
    const lancamento = this.pessoaForm.value;

    this.pessoaService.criar({ body: lancamento }).subscribe({
      next: (pessoaId) => {
        this.router.navigate(['/pessoas']);
        this.toastr.success('Pessoa salvo com sucesso!');
      },
      error: (err) => {
        console.log(err.error);
        this.toastr.error('Erro ao salvar pessoa!');
      },
    });
  }
  updatePessoa(codigo: any) {
    const pessoa = this.pessoaForm.value;
    this.pessoaService.atualizar({ codigo, body: pessoa }).subscribe({
      next: (pessoaId) => {
        this.router.navigate(['/pessoas']);
        this.toastr.success('Pessoa atualizado com sucesso!');
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
  limparCadastro() {
    this.pessoaForm.reset();
  }
  zipCodeMask(value: string): string {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
  }
  get getErrors() {
    return this.pessoaForm.controls;
  }
  onSubmit(): void {
    if (this.pessoaForm.valid) {
      console.log(this.pessoaForm.value);
      const pessoaId = this.activatedRoute.snapshot.params['codigo'];
      if (pessoaId) {
        this.updatePessoa(pessoaId);
      } else {
        this.savePessoa();
      }
    } else {
      this.pessoaForm.markAllAsTouched();
      this.toastr.error('Formulário inválido!');
    }
  }
}
