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
    private settingsService: SettingsService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  getBack() {
    this.navCtrl.back();
  }

  async change() {
    if(this.newPassword !== this.cNewPassword) {
      this.alertService.presentSimpleAlert('Neue Passwörter stimmen nicht überrein');
    }
    else if(this.newPassword.length < 8 && this.cNewPassword.length < 8) {
      this.alertService.presentSimpleAlert('Passwort muss mindestens 8 Zeichen lang sein!');
    }
    else {
      const accessToken = await Storage.get({ key: 'access_token' });

      this.loadingService.presentLoading();

      this.settingsService.changePassword(this.oldPassword, this.newPassword, accessToken.value)
        .subscribe(
          data => {
            this.loadingService.dismissLoading();
            this.getBack();
            this.toastService.presentSimpleToast('Passwort wurde erfolgreich geändert!');
          },
          error => {
            this.loadingService.dismissLoading();

            const errorCode = error.status;

            // check error type
            if (errorCode === 400) {
              this.alertService.presentSimpleAlert('Bitte fülle alle Eingabefelder aus!');
            }
            else if (errorCode === 406) {
              console.log(this.oldPassword);
              this.alertService.presentSimpleAlert('Eingegebenes Passwort ist inkorrekt!');
            }
            else {
              this.alertService.presentSimpleAlert(error.error.message);
            }
          }
        );
    }
  }

}
