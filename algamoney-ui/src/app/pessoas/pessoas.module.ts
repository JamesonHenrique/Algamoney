import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from '../shared/messages/messages.component';
import { SharedModule } from '../shared/shared.module';
import { PessoasResultadosComponent } from './pessoas-resultados/pessoas-resultados.component';

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent,
    PessoasResultadosComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class PessoasModule {}
