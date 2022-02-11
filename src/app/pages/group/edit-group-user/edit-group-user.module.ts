import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGroupUserPageRoutingModule } from './edit-group-user-routing.module';

import { EditGroupUserPage } from './edit-group-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGroupUserPageRoutingModule
  ],
  declarations: [EditGroupUserPage]
})
export class EditGroupUserPageModule {}
