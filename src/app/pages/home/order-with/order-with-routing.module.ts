import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderWithPage } from './order-with.page';

const routes: Routes = [
  {
    path: '',
    component: OrderWithPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderWithPageRoutingModule {}
