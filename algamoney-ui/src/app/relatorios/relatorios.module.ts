import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RelatoriosRoutingModule } from './relatorios.routing';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RelatorioLancamentosComponent],

  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RelatoriosModule { }
