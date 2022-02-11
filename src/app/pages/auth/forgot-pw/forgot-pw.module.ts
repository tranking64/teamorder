import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPwPageRoutingModule } from './forgot-pw-routing.module';

import { ForgotPwPage } from './forgot-pw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPwPageRoutingModule
  ],
  declarations: [ForgotPwPage]
})
export class ForgotPwPageModule {}
