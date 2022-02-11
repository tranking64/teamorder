import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitePersonPageRoutingModule } from './invite-person-routing.module';

import { InvitePersonPage } from './invite-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitePersonPageRoutingModule
  ],
  declarations: [InvitePersonPage]
})
export class InvitePersonPageModule {}
