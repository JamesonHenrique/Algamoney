import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token/token.service';
import { AuthenticationControllerService } from '../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authForm!: FormGroup;
  passwordStrength: number = 0; // Valor de 0 a 4
  passwordStrengthText: string = 'Nada';
  passwordStrengthClass: string = 'strength-nada';
  constructor(
    private title: Title,
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title.setTitle('Register');
  }
  ngOnInit(): void {
    this.authForm = this.fb.group(
      {
        nome: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.senhasIguais }
    );

    this.authForm.get('password')?.valueChanges.subscribe((value) => {
      this.calculatePasswordStrength(value);
    });
  }

  senhasIguais(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('password')?.value;
    const confirmSenha = control.get('confirmPassword')?.value;
    return senha === confirmSenha ? null : { senhasDiferentes: true };
  }

  errorMsg: Array<string> = [];
  register() {
    this.errorMsg = [];
    const authRequest = { ...this.authForm.value };
    delete authRequest.confirmPassword;
    if(this.authForm.invalid) {
      this.toastr.warning(
        'Por favor, preencha todos os campos corretamente.',
        'Formulário inválido'
      );
      return;
    }
    this.authService
      .register({
        body: authRequest,
      })
      .subscribe({
        next: (response) => {
          this.tokenService.token = response.token as string;
          this.router.navigate(['login']);
          this.toastr.success('Conta criada com sucesso');
        },
        error: (error) => {
          this.errorMsg = error.error.validationErrors;

          this.toastr.error('Erro ao tentar registrar-se', error.error.error);

          this.errorMsg.push(error.error.error);
        },
      });
  }

  calculatePasswordStrength(password: string): void {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    this.passwordStrength = strength;

    switch (strength) {
      case 0:
        this.passwordStrengthText = 'Nada';
        this.passwordStrengthClass = 'strength-nada';
        break;
      case 1:
        this.passwordStrengthText = 'Fraca';
        this.passwordStrengthClass = 'strength-fraca';
        break;
      case 2:
        this.passwordStrengthText = 'Moderada';
        this.passwordStrengthClass = 'strength-moderada';
        break;
      case 3:
        this.passwordStrengthText = 'Forte';
        this.passwordStrengthClass = 'strength-forte';
        break;
      case 4:
        this.passwordStrengthText = 'Muito Forte';
        this.passwordStrengthClass = 'strength-muito-forte';
        break;
    }
  }
  onSubmit() {
    this.register();
  }
  currentStep: number = 1;
  progressWidth: string = '33%';

  nextStep(): void {
    if (this.currentStep < 2) {
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
    this.progressWidth = `${(this.currentStep / 2) * 100}%`;
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }
}
