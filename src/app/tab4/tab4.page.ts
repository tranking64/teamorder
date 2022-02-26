import { Component } from '@angular/core';

import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { AuthService } from '../services/api/auth.service';
import { SettingsService } from '../services/api/settings.service';
import { AlertService } from '../services/alert.service';
import OneSignal from 'onesignal-cordova-plugin';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {

  constructor(
    private auth: AuthService,
    private settings: SettingsService,
    private router: Router,
    private alert: AlertService,
    private platform: Platform) { }

  navigateTo(url) {
    this.router.navigate(['/' + url]);
  }

  async logout() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.platform.ready().then(() => OneSignal.removeExternalUserId());

    this.settings.getCurrUserData(accessToken.value)
      .subscribe(
        data => {

          this.auth.logout(data.email, accessToken.value)
            .subscribe(
              async () => {
                // delete tokens
                await Storage.remove({ key: 'access_token' });
                await Storage.remove({ key: 'refresh_token' });

                this.router.navigate(['/login']);
              },
              async error => {
                await Storage.remove({ key: 'access_token' });
                await Storage.remove({ key: 'refresh_token' });

                this.router.navigate(['/login']);
              }
          );
        },
        error => {
          this.alert.presentSimpleAlert(error.error.message);
        }
      );
  }

}
