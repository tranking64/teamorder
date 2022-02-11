import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGroupUserPage } from './edit-group-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditGroupUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGroupUserPageRoutingModule {}
