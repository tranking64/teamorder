import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPwPage } from './forgot-pw.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPwPageRoutingModule {}
