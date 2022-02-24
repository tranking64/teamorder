import { Component } from '@angular/core';

import { Storage } from '@capacitor/storage';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/api/auth.service';
import { SettingsService } from '../services/api/settings.service';
import { AlertService } from '../services/alert.service';
import OneSignal from 'onesignal-cordova-plugin';
import { Platform } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';

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
    private platform: Platform,
    private loading: LoadingService) { }

  navigateTo(url) {
    this.router.navigate(['/' + url]);
  }

  async logout() {
    const accessToken = await Storage.get({ key: 'access_token' });
    let email;

    this.platform.ready().then(() => OneSignal.removeExternalUserId());

    this.settings.getCurrUserData(accessToken.value)
      .subscribe(
        data => {
          email = data.email;
        },
        error => {
          this.alert.presentSimpleAlert(error.error.message);
        }
      );

    this.auth.logout(email, accessToken.value)
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
  }

}
