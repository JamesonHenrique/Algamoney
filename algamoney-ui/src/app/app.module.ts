import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CoreModule } from './core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { PessoaRoutingModule } from './pessoas/pessoa.routing';
import { LancamentoRoutingModule } from './lancamentos/lancamento.routing';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRouteModule,

    FormsModule,
    ReactiveFormsModule,
    PessoasModule,
    LancamentosModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({

      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })

  ],
  providers: [
    HttpClient,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
