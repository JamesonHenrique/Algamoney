import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-nao-encontrada',
standalone: false,
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.css'
})
export class PaginaNaoEncontradaComponent {
  constructor(private title:Title) {
    this.title.setTitle('404 - Página não encontrada');
  }
back() {
    window.history.back();
  }
}
