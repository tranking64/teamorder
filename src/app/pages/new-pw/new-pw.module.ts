import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPwPageRoutingModule } from './new-pw-routing.module';

import { NewPwPage } from './new-pw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPwPageRoutingModule
  ],
  declarations: [NewPwPage]
})
export class NewPwPageModule {}
