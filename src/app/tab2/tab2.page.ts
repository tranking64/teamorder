import { Component } from '@angular/core';
import { GroupService } from '../services/api/group.service';
import { Storage } from '@capacitor/storage';
import { NavigationExtras, Router } from '@angular/router';
import { SettingsService } from '../services/api/settings.service';
import { AlertController, NavController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  creatorGroups = [];
  otherGroups = [];
  invitations = [];

  loaderActivated = false;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private settings: SettingsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingService: LoadingService
    ) { }

  ionViewWillEnter() {
    this.loaderActivated = true;
    this.getInitialData();
  }

  getBack() {
    this.navCtrl.navigateBack('/tabs/tab1').then(() => this.router.navigate(['/tabs/tab2']));
  }

  async getInitialData() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getCreatorGroups(accessToken.value)
      .subscribe(
        data => this.creatorGroups = data.data
      );

    this.groupService.getOtherGroups(accessToken.value)
      .subscribe(
        data => this.otherGroups = data.data
      );

    this.groupService.getInvitations(accessToken.value)
      .subscribe(
        data => {
          this.invitations = data.data;
          this.loaderActivated = false;
        }
      );
  }

  async acceptInvite(group) {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.acceptInvitation(accessToken.value, group.group_id)
      .subscribe(() => this.getBack());
  }

  async presentDeclineAlert(group) {
    const accessToken = await Storage.get({ key: 'access_token' });

    const alert = await this.alertCtrl.create({
      header: 'Warnung',
      message: 'Möchtest du diese Gruppeneinladung wirklich ablehnen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => {
          }
        }, {
          text: 'Ja',
          id: 'confirm-button',
          handler: () => {
            this.groupService.declineInvitation(accessToken.value, group.group_id)
              .subscribe(() => this.invitations = this.invitations.filter(elem => elem !== group));
          }
        }
      ]
    });

    await alert.present();
  }

  createGroup() {
    this.router.navigate(['/create-group']);
  }

  async detailView(group) {

    this.loadingService.presentLoading();

    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getSpecificGroup(accessToken.value, group.group_id)
      .subscribe(data => this.getMyUser(accessToken, data.data.users, group));
  }

  getMyUser(accessToken, myUsers, group) {

    this.settings.getCurrUserData(accessToken.value)
    .subscribe(
      data => {
        myUsers.forEach(user => {
          if (data.user_id === user.user_id) {
            const navExtras: NavigationExtras = {
              state: {
                users: myUsers,
                currentGroup: group,
                myUser: user
              }
            };

            this.loadingService.dismissLoading();

            this.router.navigate(['detail-group-page'], navExtras);
          }
        });
      }
    );
  }

}
