import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithOrderingsDetailPageRoutingModule } from './with-orderings-detail-routing.module';

import { WithOrderingsDetailPage } from './with-orderings-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithOrderingsDetailPageRoutingModule
  ],
  declarations: [WithOrderingsDetailPage]
})
export class WithOrderingsDetailPageModule {}
