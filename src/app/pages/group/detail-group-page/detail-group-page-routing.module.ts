import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailGroupPagePage } from './detail-group-page.page';

const routes: Routes = [
  {
    path: '',
    component: DetailGroupPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailGroupPagePageRoutingModule {}
