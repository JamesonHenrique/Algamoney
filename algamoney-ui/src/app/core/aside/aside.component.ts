import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: false,
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  logout() {
    this.tokenService.logout();
    this.router.navigate(['login']);
  }

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}
}
