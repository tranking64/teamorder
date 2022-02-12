import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderWithPageRoutingModule } from './order-with-routing.module';

import { OrderWithPage } from './order-with.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderWithPageRoutingModule
  ],
  declarations: [OrderWithPage]
})
export class OrderWithPageModule {}
