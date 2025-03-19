import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-header',
standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router,private tokenService: TokenService) {}
  username: string = ''
  ngOnInit(): void {

    this.username = this.tokenService.receberNome;
  }
  logout() {
    this.tokenService.logout();
    this.router.navigate(['login']);
  }
  isMobileMenuOpen = false;
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
