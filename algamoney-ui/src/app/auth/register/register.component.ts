import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  currentStep: number = 1;
  progressWidth: string = '33%';

  // Método para navegar para o próximo passo
  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.updateProgressBar();
    }
  }

  // Método para voltar ao passo anterior
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgressBar();
    }
  }

  // Atualiza a barra de progresso
  private updateProgressBar(): void {
    this.progressWidth = `${(this.currentStep / 3) * 100}%`;
  }

  // Método para verificar se um passo está ativo
  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }
}
