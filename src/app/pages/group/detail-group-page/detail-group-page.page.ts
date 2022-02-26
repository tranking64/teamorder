/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GroupService } from '../../../services/api/group.service';
import { Storage } from '@capacitor/storage';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-detail-group-page',
  templateUrl: './detail-group-page.page.html',
  styleUrls: ['./detail-group-page.page.scss'],
})
export class DetailGroupPagePage implements OnInit {

  currentGroup;
  users = [];
  myUser;;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController
    ) {

  }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.currentGroup = routerState.currentGroup;
    this.users = routerState.users;
    this.myUser = routerState.myUser;
  }

  getBack() {
    this.navCtrl.navigateBack(['/tabs/tab1']).then(() => this.router.navigate(['/tabs/tab2']));
  }

  editGroup() {
    const navExtras: NavigationExtras = {
      state: this.currentGroup
    };

    this.router.navigate(['edit-group'], navExtras);
  }

  async presentDeleteAlert() {
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
                () => this.getBack()
              );
          }
        }
      ]
    });

    await alert.present();
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
                () => this.getBack()
              );
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet(user) {
    const accessToken = await Storage.get({ key: 'access_token' });

    console.log(user);

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Aus Gruppe entfernen',
          role: 'destructive',
          handler: () => {
            this.groupService.removeUser(accessToken.value, this.currentGroup.group_id, user.user_id)
                .subscribe(
                  // remove user in view
                  () => this.getBack()
                );
          }
        },
        {
          text: 'Abbrechen',
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
        buttons: [
          {
            text: 'Aus Gruppe entfernen',
            role: 'destructive',
            handler: () => {
              this.groupService.removeUser(accessToken.value, this.currentGroup.group_id, user.user_id)
                  .subscribe(
                    // remove user in view
                    () => this.getBack()
                  );
            }
          },
          {
            text: 'Zum Admin machen',
            handler: () => {
              this.groupService.changeRole(
                accessToken.value,
                this.currentGroup,
                user.user_id,
                'ADMIN')
                  .subscribe(
                    data => {
                      user.role_type_en = 'ADMIN';
                      user.role_type = 'ADMIN';
                    }
                  );
            }
          },
          {
            text: 'Abbrechen',
            role: 'cancel'
          }
        ]
      });
    }
    else {
      actionSheet = await this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Aus Gruppe entfernen',
            role: 'destructive',
            handler: () => {
              this.groupService.removeUser(accessToken.value, this.currentGroup.group_id, user.user_id)
                  .subscribe(
                    () => this.users = this.users.filter(elem => elem !== user)
                  );
            }
          },
          {
            text: 'Zum Mitglied machen',
            handler: () => {
              this.groupService.changeRole(
                accessToken.value,
                this.currentGroup,
                user.user_id,
                'MEMBER')
                  .subscribe(
                    data => {
                      user.role_type_en = 'MEMBER';
                      user.role_type = 'MITGLIED';
                    }
                  );
            }
          },
          {
            text: 'Abbrechen',
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

  toTitleCase = (phrase) =>
    phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}
