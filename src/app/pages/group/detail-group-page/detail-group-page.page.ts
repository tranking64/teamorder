/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GroupService } from '../../../services/api/group.service';
import { Storage } from '@capacitor/storage';
import { NavController, AlertController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/api/settings.service';

@Component({
  selector: 'app-detail-group-page',
  templateUrl: './detail-group-page.page.html',
  styleUrls: ['./detail-group-page.page.scss'],
})
export class DetailGroupPagePage implements OnInit {

  currentGroup;
  users = [];
  myUser = {
    role_type: null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private settings: SettingsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
    ) {

  }

  ngOnInit() {
    this.currentGroup = this.router.getCurrentNavigation().extras.state;
    this.fetchData(this.currentGroup);
  }

  ionViewWillEnter() {
    //this.currentGroup = this.router.getCurrentNavigation().extras.state;
    //this.fetchData(this.currentGroup);
    this.getMyUser();
  }

  async fetchData(routerState) {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getSpecificGroup(accessToken.value, routerState.group_id)
      .subscribe(
        async data => {
          this.users = data.data.users;
          await this.getMyUser();
        }
      );
  }

  async getMyUser() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.settings.getCurrUserData(accessToken.value)
    .subscribe(
      data => {
        this.users.forEach(user => {
          if (data.user_id === user.user_id) {
            this.myUser = user;
          }
        });
      }
    );
  }

  getBack() {
    this.navCtrl.back();
  }

  editGroup() {
    const navExtras: NavigationExtras = {
      state: this.currentGroup
    };

    this.router.navigate(['edit-group'], navExtras);
  }

  async presentAlert() {
    const accessToken = await Storage.get({ key: 'access_token' });

    const alert = await this.alertCtrl.create({
      header: 'Warnung',
      message: 'Möchtest du diese Gruppe wirklich löschen?',
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
            this.groupService.deleteGroup(accessToken.value, this.currentGroup.group_id)
              .subscribe(
                // bypass load bug
                () => this.router.navigate(['/tabs']).then(() => this.router.navigate(['tabs/tab2']))
              );
          }
        }
      ]
    });


  }

  deleteGroup() {
    this.presentAlert();
  }

  async presentLeaveAlert() {
    const accessToken = await Storage.get({ key: 'access_token' });

    const alert = await this.alertCtrl.create({
      header: 'Warnung',
      message: 'Möchtest du diese Gruppe wirklich verlassen?',
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
            this.groupService.leaveGroup(accessToken.value, this.currentGroup.group_id)
              .subscribe(
                // bypass load bug
                () => this.router.navigate(['/tabs']).then(() => this.router.navigate(['tabs/tab2']))
              );
          }
        }
      ]
    });

    await alert.present();
  }

  leaveGroup() {
    this.presentLeaveAlert();
  }

  invite() {
    const navExtras: NavigationExtras = {
      state: this.currentGroup
    };

    this.router.navigate(['invite-person'], navExtras);
  }

  toTitleCase = (phrase) =>
    phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}
