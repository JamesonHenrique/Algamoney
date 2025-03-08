import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: false,
  template: `
  <div *ngIf="errorMessage" class="text-red-600 text-sm mt-1">
    {{ errorMessage }}
  </div>
`,
styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  @Input() control!: AbstractControl;
  @Input() fieldName: string = '';
  @Input() customErrors: { [key: string]: string } = {};

  get errorMessage(): string | null {
    if (this.control && this.control.errors && this.control.touched) {
      for (const errorName in this.control.errors) {
        if (this.customErrors[errorName]) {
          return this.customErrors[errorName];
        }
        // Default error messages if a custom one isn't provided.
        switch (errorName) {
          case 'required':
            return `${this.fieldName} é obrigatório.`;
          case 'pattern':
            return `${this.fieldName} está em um formato inválido.`;
          default:
            return `${this.fieldName} está inválido.`;
        }
      }
    }
    return null;
  }
}
