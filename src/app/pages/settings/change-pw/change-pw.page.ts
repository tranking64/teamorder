import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { SettingsService } from '../../../services/api/settings.service';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.page.html',
  styleUrls: ['./change-pw.page.scss'],
})
export class ChangePwPage implements OnInit {

  oldPassword: string;
  newPassword: string;
  cNewPassword: string;

  constructor(
    private settings: SettingsService,
    private router: Router,
    private alert: AlertService,
    private loading: LoadingService,
    private toast: ToastService) { }

  ngOnInit() {
  }

  async change() {
    if(this.newPassword !== this.cNewPassword) {
      this.alert.presentSimpleAlert('Neue Passwörter stimmen nicht überrein');
    }
    else {
      const accessToken = await Storage.get({ key: 'access_token' });

      this.loading.presentLoading();

      this.settings.changePassword(this.oldPassword, this.newPassword, accessToken.value)
        .subscribe(
          data => {
            this.loading.dismissLoading();
            this.router.navigate(['/tabs/tab4']);
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
