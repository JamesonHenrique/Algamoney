import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private title:Title) {
    this.title.setTitle('Register');
  }
  currentStep: number = 1;
  progressWidth: string = '33%';

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.updateProgressBar();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgressBar();
    }
  }

  private updateProgressBar(): void {
    this.progressWidth = `${(this.currentStep / 3) * 100}%`;
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }
}
