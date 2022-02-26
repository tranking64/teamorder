import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GroupService } from '../../../services/api/group.service';
import { Storage } from '@capacitor/storage';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss'],
})
export class EditGroupPage implements OnInit {

  groupName;
  description;
  groupId;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private groupService: GroupService,
    private alertService: AlertService) { }

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
        () => this.navCtrl.navigateBack(['/tabs/tab1']).then(() => this.router.navigate(['tabs/tab2'])),
        error => {
          if (error.status === 500 && error.error.status === 'error') {
            this.navCtrl.back();
          }
          else if (error.status === 400 && error.error.status === 'group_name') {
            this.alertService.presentSimpleAlert('Dieser Gruppenname existiert bereits!');
          }
          else {
            this.alertService.presentSimpleAlert(error.error.message);
          }
        }
      );
  }

}
