import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  {
    path: 'lancamentos',
    loadChildren: () =>
      import('./lancamentos/lancamentos.module').then(
        (m) => m.LancamentosModule
      ),
  },
  {
    path: 'pessoas',
    loadChildren: () =>
      import('./pessoas/pessoas.module').then(
        (m) => m.PessoasModule
      ),
  },
  {
    path: 'pagina-nao-encontrada',
    component: PaginaNaoEncontradaComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada',
    pathMatch: 'full',
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouteModule {}
