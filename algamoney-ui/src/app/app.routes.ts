import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginaNaoEncontradaComponent } from './auth/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthGuard } from './services/guard/guard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'lancamentos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./lancamentos/lancamentos.module').then(
        (m) => m.LancamentosModule
      ),
  },
  {
    path: 'pessoas',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pessoas/pessoas.module').then((m) => m.PessoasModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'relatorios',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./relatorios/relatorios.module').then((m) => m.RelatoriosModule),
  },

  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouteModule {}
