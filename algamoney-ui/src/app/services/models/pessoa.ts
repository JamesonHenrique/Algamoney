/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Endereco } from '../models/endereco';
import { Contato } from './contato';
export interface Pessoa {
  ativo: boolean;
  codigo?: number;
  endereco: Endereco;
  nome: string;
  contatos: Array<Contato>;
}
