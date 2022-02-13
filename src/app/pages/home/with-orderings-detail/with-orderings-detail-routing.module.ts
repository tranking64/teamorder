import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithOrderingsDetailPage } from './with-orderings-detail.page';

const routes: Routes = [
  {
    path: '',
    component: WithOrderingsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithOrderingsDetailPageRoutingModule {}
