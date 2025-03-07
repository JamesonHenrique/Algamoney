import { Routes } from '@angular/router';


import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';

export const routes: Routes = [

    {path: 'lancamentos', component: LancamentosPesquisaComponent
    },
    {path: 'pessoas', component: PessoaPesquisaComponent
    },

    {
        path: 'pessoa/nova', component: PessoaCadastroComponent
    },
    {
        path: 'lancamento/novo', component: LancamentosCadastroComponent
    },
    {
        path: '**',  redirectTo: 'lancamentos', pathMatch: 'full'
        },

];
