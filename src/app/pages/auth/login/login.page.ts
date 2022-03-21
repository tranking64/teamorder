import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/api/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { SettingsService } from 'src/app/services/api/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private platform: Platform,
    private settingsService: SettingsService) { }

  // register device on OneSignal
  async oneSignalInit() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.settingsService.getCurrUserData(accessToken.value)
      .subscribe(
        data => {
          // one signal app id
          OneSignal.setAppId('0c86885f-d9c7-4d92-8cc9-11a1afa6f697');

          // set external user id to tell users apart from each other
          OneSignal.setExternalUserId(data.user_id.toString());

          // set message language depending on country language
          // eslint-disable-next-line max-len
          if (data.country.country_type === 'AUSTRIA' || data.country.country_type === 'GERMANY' || data.country.country_type === 'SWITZERLAND') {
            OneSignal.setLanguage('de');
          }
          else {
            OneSignal.setLanguage('en');
          }
        }
      );
  }

  ionViewWillEnter() {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
    this.rememberLogin();
  }

  async rememberLogin() {
    const refreshToken = await Storage.get({ key: 'refresh_token' });

    if(refreshToken.value != null) {
      this.loadingService.presentLoading();

      this.authService.rememberLogin(refreshToken.value)
        .subscribe(
          async (data) => {
            this.loadingService.dismissLoading();

            // remove old tokens
            await Storage.remove({ key: 'access_token' });
            await Storage.remove({ key: 'refresh_token' });

            // set new tokens
            await Storage.set({key: 'access_token', value: 'Bearer ' + data.data.tokens.access_token});
            await Storage.set({key: 'refresh_token', value: data.data.tokens.refresh_token});

            // wait for ability to use native functionalities of device/platform
            this.platform.ready().then(() => this.oneSignalInit());

            this.router.navigate(['/tabs/tab1']);
          },
          async (error) => {
            this.loadingService.dismissLoading();

            // delete possible old unvalid tokens
            await Storage.remove({ key: 'access_token' });
            await Storage.remove({ key: 'refresh_token' });

            // equal with unsubscribing the device from OneSignal
            this.platform.ready().then(() => OneSignal.removeExternalUserId());
          }
        );
    }
  }

  async login() {

    // check if a valid email was entered via. regex-expression
    if(!this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.alertService.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
    }

    else if (this.password === '') {
      this.alertService.presentSimpleAlert('Gebe bitte ein Passwort ein!');
    }

    // passed validations
    else {
      await Storage.remove({ key: 'access_token' });
      await Storage.remove({ key: 'refresh_token' });

      this.loadingService.presentLoading();

      this.authService.login(this.email, this.password).subscribe(
        async data => {
          // store tokens in local database
          await Storage.set({key: 'access_token', value: 'Bearer ' + data.data.tokens.access_token});
          await Storage.set({key: 'refresh_token', value: data.data.tokens.refresh_token});

          this.loadingService.dismissLoading();

          // check/wait if native functionality can be used
          this.platform.ready().then(() => this.oneSignalInit());

          this.router.navigate(['/tabs/tab1']);
        },
        error => {
          this.loadingService.dismissLoading();

          const errorCode = error.status;
          const errorDetail = error.error.status;

          // check on different error types
          if (errorCode === 401 && errorDetail === 'error') {
            this.alertService.presentSimpleAlert('Dein Konto ist noch nicht verifiziert!');
          }
          else if (errorCode === 401 && errorDetail === 'blocked') {
            this.alertService.presentSimpleAlert('Dein Konto ist zurzeit blockiert!');
          }
          else if (errorCode === 404) {
            this.alertService.presentSimpleAlert('Dieses Konto existiert nicht!');
          }
          else if (errorCode === 406) {
            this.alertService.presentSimpleAlert('Das eingegebene Passwort ist inkorrekt!');
          }
          else if (errorCode === 429) {
            this.alertService.presentSimpleAlert('Zu viele Anmeldeversuche!');
          }
          else {
            this.alertService.presentSimpleAlert(error.error.message);
          }
      });
    }
  }
}
