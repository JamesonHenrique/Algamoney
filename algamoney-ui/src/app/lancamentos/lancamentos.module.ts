import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LancamentoRoutingModule } from './lancamento.routing';

@NgModule({
  declarations: [
    LancamentosCadastroComponent,
    LancamentosPesquisaComponent

  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,SharedModule, LancamentoRoutingModule
  ],

})
export class LancamentosModule { }
