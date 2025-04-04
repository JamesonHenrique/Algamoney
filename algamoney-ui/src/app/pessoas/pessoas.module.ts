import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from '../shared/messages/messages.component';
import { SharedModule } from '../shared/shared.module';
import { PessoaRoutingModule } from './pessoa.routing';
import { PessoasCadastroContatoComponent } from './pessoas-cadastro-contato/pessoas-cadastro-contato.component';

@NgModule({
  declarations: [PessoaCadastroComponent, PessoaPesquisaComponent, PessoasCadastroContatoComponent],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    PessoaRoutingModule,
  ],
})
export class PessoasModule {}
