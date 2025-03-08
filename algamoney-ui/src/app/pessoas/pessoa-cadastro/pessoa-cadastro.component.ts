import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from '../../shared/messages/messages.component';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: false,
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.css',
})
export class PessoaCadastroComponent {
  pessoaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      ativo: [true, Validators.required],
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
  get getErrors() {
    return this.pessoaForm.controls;
  }
  onSubmit(): void {
    if (this.pessoaForm.valid) {
      console.log(this.pessoaForm.value);
      // Implement submission logic here
    } else {
      this.pessoaForm.markAllAsTouched();
    }
  }
}
