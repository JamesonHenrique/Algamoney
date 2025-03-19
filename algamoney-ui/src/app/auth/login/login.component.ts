import { AuthenticationRequest } from './../../services/models/authentication-request';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authForm!: FormGroup;
  errorMsg: Array<string> = [];

  constructor(
    private title: Title,
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title.setTitle('Login');
  }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.errorMsg = [];

    if (this.authForm.invalid) {
      this.toastr.warning(
        'Por favor, preencha todos os campos corretamente.',
        'Formulário inválido'
      );
      return;
    }

    const authRequest = this.authForm.value;
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    this.authService.authenticate({ body: authRequest }).subscribe({
      next: (response) => {
        this.tokenService.token = response.token as string;
        this.toastr.success('Login realizado com sucesso!', 'Bem-vindo');
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMsg.push(
            'Credenciais inválidas. Verifique seu e-mail e senha.'
          );
        } else if (error.error && error.error.validationErrors) {
          this.errorMsg = error.error.validationErrors;
        } else {
          this.errorMsg.push(
            'Ocorreu um erro inesperado. Tente novamente mais tarde.'
          );
        }

        this.errorMsg.forEach((msg) => {
          this.toastr.error(msg, 'Erro ao tentar logar');
        });
      },
    });

  }

  onSubmit() {
    this.login();
  }
}
