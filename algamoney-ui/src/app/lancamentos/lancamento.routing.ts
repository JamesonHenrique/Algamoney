import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { AuthGuard } from '../services/guard/guard.service';

const routes: Routes = [
  {
    path: '',
    component: LancamentosPesquisaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro',
    canActivate: [AuthGuard],
    component: LancamentosCadastroComponent,
  },
  {
    path: ':codigo',
    canActivate: [AuthGuard],
    component: LancamentosCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoRoutingModule {}
