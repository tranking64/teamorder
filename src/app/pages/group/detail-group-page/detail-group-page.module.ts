import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailGroupPagePageRoutingModule } from './detail-group-page-routing.module';

import { DetailGroupPagePage } from './detail-group-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailGroupPagePageRoutingModule
  ],
  declarations: [DetailGroupPagePage]
})
export class DetailGroupPagePageModule {}
