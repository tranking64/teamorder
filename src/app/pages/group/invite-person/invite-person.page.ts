import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { GroupService } from '../../../services/api/group.service';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-person',
  templateUrl: './invite-person.page.html',
  styleUrls: ['./invite-person.page.scss'],
})
export class InvitePersonPage implements OnInit {

  email = '';
  groupId;

  constructor(
    private navCtrl: NavController,
    private groupService: GroupService,
    private router: Router,
    private toastCtrl: ToastController,
    private alert: AlertService,
    private loading: LoadingService) {

    }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Die Person wurde erfolgreich eingeladen!',
      color: 'success',
      duration: 2000
    });

    toast.present();
  }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.groupId = routerState.group_id;
    console.log(this.groupId);
  }

  async invite() {
    if (!this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.alert.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
    }
    else {
      const accessToken = await Storage.get({ key: 'access_token' });

      this.groupService.inviteToGroup(accessToken.value, this.groupId, this.email)
      .subscribe(
        () => {
          this.getBack();
          this.presentToast();
        },
        error => {
          if (error.status === 404) {
            this.alert.presentSimpleAlert('Es wurde kein Benutzer mit dieser E-Mail-Adresse gefunden!');
          }
          else {
            this.alert.presentSimpleAlert(error.error.message);
          }
        }
      );
    }

  }

  getBack() {
    this.navCtrl.back();
  }
}
