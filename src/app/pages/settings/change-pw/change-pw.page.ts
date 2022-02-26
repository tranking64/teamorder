import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { SettingsService } from '../../../services/api/settings.service';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.page.html',
  styleUrls: ['./change-pw.page.scss'],
})
export class ChangePwPage implements OnInit {

  oldPassword;
  newPassword;
  cNewPassword;

  constructor(
    private settings: SettingsService,
    private router: Router,
    private alert: AlertService,
    private loading: LoadingService,
    private toast: ToastService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  getBack() {
    this.navCtrl.back();
  }

  async change() {
    if(this.newPassword !== this.cNewPassword) {
      this.alert.presentSimpleAlert('Neue Passwörter stimmen nicht überrein');
    }
    else if(this.newPassword.length < 8 && this.cNewPassword.length < 8) {
      this.alert.presentSimpleAlert('Passwort muss mindestens 8 Zeichen lang sein!');
    }
    else {
      const accessToken = await Storage.get({ key: 'access_token' });

      this.loading.presentLoading();

      this.settings.changePassword(this.oldPassword, this.newPassword, accessToken.value)
        .subscribe(
          data => {
            this.loading.dismissLoading();
            this.getBack();
            this.toast.presentSimpleToast('Passwort wurde erfolgreich geändert!');
          },
          error => {
            this.loading.dismissLoading();

            const errorCode = error.status;

            if (errorCode === 400) {
              this.alert.presentSimpleAlert('Bitte fülle alle Eingabefelder aus!');
            }
            else if (errorCode === 406) {
              console.log(this.oldPassword);
              this.alert.presentSimpleAlert('Eingegebenes Passwort ist inkorrekt!');
            }
            else {
              this.alert.presentSimpleAlert(error.error.message);
            }
          }
        );
    }
  }

}
