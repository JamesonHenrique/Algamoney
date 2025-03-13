import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColorService } from '../../services/colors/color.service';

@Component({
  selector: 'app-modal-delete',
  standalone: false,
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {
  constructor(public colorService:ColorService) { }

  @Input() index: number = 1;
  @Input() lancamentoSelected: any;
  @Input() modalId: string = 'modal-1';
  @Input() title: string = 'Confirmar exclusão';
  @Input() message: string = 'Você está prestes a excluir o seguinte item:';
  @Input() item: any;
  @Input() cancelLabel: string = 'Cancelar';
  @Input() confirmLabel: string = 'Excluir';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  lancamentos: any[] = [];
  getInitials(nome: string): string {
    if (!nome) return '';
    const nomes = nome.split(' ');
    const iniciais = nomes.slice(0, 2).map((n: string) => n.charAt(0).toUpperCase());
    return iniciais.join('');
  }
  getIndex(item: any): number {
      if (!item || !this.lancamentos) return -1; // Verifica se lancamento ou lancamentos são nulos
      return this.lancamentos.findIndex(l => l.codigo === item.codigo);
  }
}