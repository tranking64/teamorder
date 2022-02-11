import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitePersonPage } from './invite-person.page';

const routes: Routes = [
  {
    path: '',
    component: InvitePersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitePersonPageRoutingModule {}
