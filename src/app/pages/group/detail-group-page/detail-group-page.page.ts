/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GroupService } from '../../../services/api/group.service';
import { Storage } from '@capacitor/storage';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/api/settings.service';
import { LoadingService } from 'src/app/services/loading.service';

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
    private groupService: GroupService,
    private settings: SettingsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loading: LoadingService,
    private actionSheetCtrl: ActionSheetController
    ) {

  }

  ngOnInit() {
    this.loading.presentLoading();
    this.currentGroup = this.router.getCurrentNavigation().extras.state;
    this.fetchData(this.currentGroup);
  }

  ionViewWillEnter() {
  }

  async fetchData(routerState) {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getSpecificGroup(accessToken.value, routerState.group_id)
      .subscribe(
        async data => {
          this.users = data.data.users;
          await this.getMyUser();
          this.loading.dismissLoading();
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

    await alert.present();
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

  async presentRemoveAlert(currUser) {
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
            this.groupService.removeUser(accessToken.value, this.currentGroup.group_id, currUser.user_id)
              .subscribe(
                // remove user in view
                () => this.users = this.users.filter(elem => elem !== currUser)
              );
          }
        }
      ]
    });

    await alert.present();
  }

  removeUser(user) {
    this.presentActionSheet(user);
  }

  async presentActionSheet(user) {
    const accessToken = await Storage.get({ key: 'access_token' });

    console.log(user);

    const actionSheet = await this.actionSheetCtrl.create({
      //header: 'Einstellungen',
      buttons: [
        {
          text: 'Aus Gruppe entfernen',
          role: 'destructive',
          //icon: 'trash',
          handler: () => {
            //this.presentRemoveAlert(user);
            this.groupService.removeUser(accessToken.value, this.currentGroup.group_id, user.user_id)
                .subscribe(
                  // remove user in view
                  () => this.users = this.users.filter(elem => elem !== user)
                );
          }
        },
        {
          text: 'Abbrechen',
          //icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  async presentAdminActionSheet(user) {
    const accessToken = await Storage.get({ key: 'access_token' });

    let actionSheet;

    if(user.role_type_en === 'MEMBER') {
      actionSheet = await this.actionSheetCtrl.create({
        //header: 'Einstellungen',
        buttons: [
          {
            text: 'Aus Gruppe entfernen',
            role: 'destructive',
            //icon: 'trash',
            handler: () => {
              //this.presentRemoveAlert(user);
              this.groupService.removeUser(accessToken.value, this.currentGroup.group_id, user.user_id)
                  .subscribe(
                    // remove user in view
                    () => this.users = this.users.filter(elem => elem !== user)
                  );
            }
          },
          {
            text: 'Zum Admin befördern',
            handler: () => {
              this.groupService.changeRole(
                accessToken.value,
                this.currentGroup,
                user.user_id,
                'ADMIN')
                  .subscribe(
                    data => {
                      const objIndex = this.users.findIndex((elem => elem.user_id === user.user_id));
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      this.users[objIndex].role_type_en = 'ADMIN';
                      this.users[objIndex].role_type = 'ADMIN';

                      console.log(this.users);

                      //this.router.navigate(['/tabs/tab2']);
                    }
                  );
            }
          },
          {
            text: 'Abbrechen',
            //icon: 'close',
            role: 'cancel'
          }
        ]
      });
    }
    else {
      actionSheet = await this.actionSheetCtrl.create({
        //header: 'Einstellungen',
        buttons: [
          {
            text: 'Aus Gruppe entfernen',
            role: 'destructive',
            //icon: 'trash',
            handler: () => {
              //this.presentRemoveAlert(user);
              this.groupService.removeUser(accessToken.value, this.currentGroup.group_id, user.user_id)
                  .subscribe(
                    // remove user in view
                    () => this.users = this.users.filter(elem => elem !== user)
                  );
            }
          },
          {
            text: 'Zum Mitglied degradieren',
            handler: () => {
              user.role_type_en = 'MEMBER';

              this.groupService.changeRole(
                accessToken.value,
                this.currentGroup,
                user.user_id,
                user.role_type_en)
                  .subscribe(
                    data => {
                      const objIndex = this.users.findIndex((elem => elem.user_id === user.user_id));
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      this.users[objIndex].role_type_en = 'MEMBER';
                      this.users[objIndex].role_type = 'MEMBER';

                      //this.router.navigate(['/tabs/tab2']);
                    }
                  );
            }
          },
          {
            text: 'Abbrechen',
            //icon: 'close',
            role: 'cancel'
          }
        ]
      });
    }

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  invite() {
    const navExtras: NavigationExtras = {
      state: this.currentGroup
    };

    this.router.navigate(['invite-person'], navExtras);
  }

  manageUser(currentUser) {
    this.presentAdminActionSheet(currentUser);

    /*const data = {
      user: currentUser,
      group: this.currentGroup
    };

    const navExtras: NavigationExtras = {
      state: data
    };

    this.router.navigate(['manage-user'], navExtras);*/
  }

  toTitleCase = (phrase) =>
    phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}
