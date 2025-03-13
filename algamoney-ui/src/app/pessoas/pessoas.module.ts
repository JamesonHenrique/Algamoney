import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from '../shared/messages/messages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent,

  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class PessoasModule {}
