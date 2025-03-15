import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: PessoaPesquisaComponent,
  },
  { path: 'cadastro', component: PessoaCadastroComponent },
  {
    path: ':codigo',
    component: PessoaCadastroComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaRoutingModule {}
