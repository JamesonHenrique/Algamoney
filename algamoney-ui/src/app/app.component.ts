import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent {
  title = 'algamoney-ui';
  constructor(private router: Router) {}
  isAuthPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }

  isMobileMenuOpen = false;
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
