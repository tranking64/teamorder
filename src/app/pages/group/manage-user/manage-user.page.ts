import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { EnumerationDataService } from '../../../services/api/enumeration-data.service';
import { GroupService } from '../../../services/api/group.service';
import { LoadingService } from '../../../services/loading.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.page.html',
  styleUrls: ['./manage-user.page.scss'],
})
export class ManageUserPage implements OnInit {

  user;
  group;
  roles = [];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private enumData: EnumerationDataService,
    private groupService: GroupService,
    private loadingService: LoadingService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.user = routerState.user;
    this.group = routerState.group;
    this.getRoles();
  }

  getBack() {
    this.navCtrl.back();
  }

  async presentAlert() {
    const accessToken = await Storage.get({ key: 'access_token' });

    const alert = await this.alertCtrl.create({
      header: 'Warnung',
      message: 'Möchtest du diesen Benuter wirklich aus der Gruppe entfernen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          //cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
          }
        }, {
          text: 'Ja',
          id: 'confirm-button',
          handler: () => {
            this.groupService.removeUser(accessToken.value, this.group.group_id, this.user.user_id)
              .subscribe(
                // bypass load bug
                () => this.router.navigate(['/tabs/tab2'])
              );
          }
        }
      ]
    });

    await alert.present();
  }

  removeUser() {
    this.presentAlert();
  }

  async updateUser() {

    this.loadingService.presentLoading();

    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.changeRole(
      accessToken.value,
      this.group.group_id,
      this.user.user_id,
      this.user.role_type_en)
        .subscribe(
          data => {
            this.loadingService.dismissLoading();
            this.router.navigate(['/tabs/tab2']);
          },
          error => {
            this.loadingService.dismissLoading();
            console.log(error);
          }
        );
  }

  getRoles = () => this.enumData.fetchRoles().subscribe(
    (data) => this.roles = data.data
  );

  toTitleCase = (phrase) =>
    phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

}
