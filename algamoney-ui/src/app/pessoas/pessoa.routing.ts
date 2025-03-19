import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { AuthGuard } from '../services/guard/guard.service';

const routes: Routes = [
  {
    path: '',
    component: PessoaPesquisaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro',
    canActivate: [AuthGuard],
    component: PessoaCadastroComponent,
  },

  {
    path: ':codigo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaRoutingModule {}
