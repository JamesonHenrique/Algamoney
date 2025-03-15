import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRouteModule } from '../app.routes';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';



@NgModule({
  declarations: [FooterComponent,HeaderComponent,PaginaNaoEncontradaComponent],
  imports: [
    CommonModule, AppRouteModule
  ],
  exports: [FooterComponent,HeaderComponent,PaginaNaoEncontradaComponent]
})
export class CoreModule { }
