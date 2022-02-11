import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPwPage } from './new-pw.page';

const routes: Routes = [
  {
    path: '',
    component: NewPwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPwPageRoutingModule {}
