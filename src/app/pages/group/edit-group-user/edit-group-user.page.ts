import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-group-user',
  templateUrl: './edit-group-user.page.html',
  styleUrls: ['./edit-group-user.page.scss'],
})
export class EditGroupUserPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  getBack() {
    this.navCtrl.back();
  }

}
