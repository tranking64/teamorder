import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GroupService } from '../../../services/api/group.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss'],
})
export class EditGroupPage implements OnInit {

  groupName;
  description;
  groupId;

  constructor(private navCtrl: NavController, private router: Router, private groupService: GroupService) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.groupName = routerState.group_name;
    this.description = routerState.description;
    this.groupId = routerState.group_id;
  }

  getBack() {
    this.navCtrl.back();
  }

  async update() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.updateGroup(accessToken.value, this.groupName, this.description, this.groupId)
      .subscribe(
        () => this.router.navigate(['/tabs']).then(() => this.router.navigate(['tabs/tab2']))
      );
  }

}
