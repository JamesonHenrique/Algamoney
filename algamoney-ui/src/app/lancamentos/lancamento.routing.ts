import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: LancamentosPesquisaComponent,
  },
  { path: 'cadastro', component: LancamentosCadastroComponent },
  {
    path: ':codigo',
    component: LancamentosCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoRoutingModule {}
