import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/api/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private loading: LoadingService,
    private alert: AlertService) {}

  // called e.g. when from logout --> login
  // removing old inpunts
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
      // eventually solve with loadingScreen (animated)
      this.loading.presentLoading();

      this.auth.rememberLogin(refreshToken.value)
        .subscribe(
          async (data) => {

            // remove old tokens
            await Storage.remove({ key: 'access_token' });
            await Storage.remove({ key: 'refresh_token' });

            await Storage.set({key: 'access_token', value: 'Bearer ' + data.data.tokens.access_token});
            await Storage.set({key: 'refresh_token', value: data.data.tokens.refresh_token});

            this.loading.dismissLoading();

            this.router.navigate(['/tabs/tab1']);
          },
          async (error) => {
            // delete possible old unvalid tokens
            await Storage.remove({ key: 'access_token' });
            await Storage.remove({ key: 'refresh_token' });

            this.loading.dismissLoading();
            console.log(error);
          }
        );
    }
  }

  async login() {

    if(!this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.alert.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
    }

    else if (this.password === '') {
      this.alert.presentSimpleAlert('Gebe bitte ein Passwort ein!');
    }

    // passed validations
    else {
      // unecessary?
      await Storage.remove({ key: 'access_token' });
      await Storage.remove({ key: 'refresh_token' });

      this.loading.presentLoading();

      this.auth.login(this.email, this.password).subscribe(
        async (data) => {
          // store tokens in local database
          await Storage.set({key: 'access_token', value: 'Bearer ' + data.data.tokens.access_token});
          await Storage.set({key: 'refresh_token', value: data.data.tokens.refresh_token});

          this.loading.dismissLoading();

          this.router.navigate(['/tabs/tab1']);
        },
        (error) => {
          this.loading.dismissLoading();

          const errorCode = error.status;
          const errorDetail = error.error.status;

          if (errorCode === 401 && errorDetail === 'error') {
            this.alert.presentSimpleAlert('Dein Konto ist noch nicht verifiziert!');
          }
          else if (errorCode === 401 && errorDetail === 'blocked') {
            this.alert.presentSimpleAlert('Dein Konto ist zurzeit blockiert!');
          }
          else if (errorCode === 404) {
            this.alert.presentSimpleAlert('Dieses Konto existiert nicht!');
          }
          else if (errorCode === 406) {
            this.alert.presentSimpleAlert('Das eingegebene Passwort ist inkorrekt!');
          }
          else if (errorCode === 429) {
            this.alert.presentSimpleAlert('Zu viele Anmeldeversuche!');
          }
          else {
            this.alert.presentSimpleAlert(error.error.message);
          }
      });
    }

  }
}