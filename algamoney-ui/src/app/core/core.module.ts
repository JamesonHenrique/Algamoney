import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

import { AsideComponent } from './aside/aside.component';

@NgModule({
  declarations: [FooterComponent, AsideComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, AsideComponent, HeaderComponent],
})
export class CoreModule {}
