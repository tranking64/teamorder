import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { GroupService } from '../../../services/api/group.service';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

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
    private alertService: AlertService,
    private toastService: ToastService,
    private loadingService: LoadingService) { }

  ngOnInit() {
    // get passed data
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.groupId = routerState.group_id;
  }

  async invite() {
    // validate email with regex-expression
    if (!this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.alertService.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
    }
    else {
      const accessToken = await Storage.get({ key: 'access_token' });

      this.loadingService.presentLoading();

      this.groupService.inviteToGroup(accessToken.value, this.groupId, this.email)
      .subscribe(
        () => {
          this.loadingService.dismissLoading();
          this.getBack();
          this.toastService.presentSimpleToast('Die Person wurde erfolgreich eingeladen!');
        },
        error => {
          this.loadingService.dismissLoading();

          // check error type
          if (error.status === 404) {
            this.alertService.presentSimpleAlert('Es wurde kein Benutzer mit dieser E-Mail-Adresse gefunden!');
          }
          else {
            this.alertService.presentSimpleAlert(error.error.message);
          }
        }
      );
    }

  }

  getBack() {
    this.navCtrl.back();
  }
}
