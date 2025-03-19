import { NgForm } from '@angular/forms';
import { Contato } from './../../services/models/contato';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-cadastro-contato',
  standalone: false,
  templateUrl: './pessoas-cadastro-contato.component.html',
  styleUrl: './pessoas-cadastro-contato.component.css'
})
export class PessoasCadastroContatoComponent {
  @Input() contatos: Array<Contato> = [];
  exbindoFormularioContato = false;
  contato: Contato = {} as Contato;
  contatoIndex?: number;

  constructor() { }

  ngOnInit(): void { }

  prepararNovoContato() {
    this.exbindoFormularioContato = true;
    this.contato = {};
    this.contatoIndex = this.contatos.length;
    console.log(this.contatos);
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exbindoFormularioContato = true;
    this.contatoIndex = index;
    console.log(this.contatos);
  }

  confirmarContato(frm: NgForm) {
    if (this.contatoIndex !== undefined && this.contato) {
      this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
      console.log(this.contatos);
    }
    this.exbindoFormularioContato = false;
    frm.reset();
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  clonarContato(contato: Contato): Contato {
    return { ...contato };
  }

  get editando() {
    return this.contato && this.contato.codigo;
  }
}
