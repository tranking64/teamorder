import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { GroupService } from '../../../services/api/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  groupName = '';
  description;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private alert: AlertService,
    private loading: LoadingService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  getBack() {
    // this is needed because navigating directly to tab2 doesn't refresh the page
    this.navCtrl.navigateBack(['/tabs/tab4']).then(() => this.router.navigate(['/tabs/tab2']));
  }

  async create() {
    if (this.groupName === '') {
      this.alert.presentSimpleAlert('Gebe bitte einen Gruppennamen ein!');
    }
    else {
      const accessToken = await Storage.get({ key: 'access_token' });

      this.loading.presentLoading();

      this.groupService.createGroup(accessToken.value, this.groupName, this.description)
        .subscribe(
          // in case of successful creation
          () => {
            this.loading.dismissLoading();
            this.getBack();
          },
          error => {
            this.loading.dismissLoading();

            const errorCode = error.status;

            // check error
            if (errorCode === 400) {
              this.alert.presentSimpleAlert('Dieser Gruppenname ist schon vergeben!');
            }
            else {
              this.alert.presentSimpleAlert(error.error.message);
            }
          }
        );
    }
  }

}
