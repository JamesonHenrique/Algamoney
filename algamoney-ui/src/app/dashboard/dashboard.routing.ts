import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/guard/guard.service';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class DashboardRoutingModule {}