import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosResultadosComponent } from './lancamentos-resultados/lancamentos-resultados.component';
import { MessagesComponent } from '../shared/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LancamentosCadastroComponent,
    LancamentosPesquisaComponent,
    LancamentosResultadosComponent,

  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,SharedModule
  ],
 
})
export class LancamentosModule { }
