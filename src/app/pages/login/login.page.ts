import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/login-data';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private service: ApiService, private router: Router, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.rememberLogin();
  }

  async rememberLogin() {
    const refreshToken = await Storage.get({ key: 'refresh_token' });

    if(refreshToken.value != null) {
      // eventually solve with loadingScreen (animated)
      const loading = await this.loadingCtrl.create({
        translucent: true
      });

      loading.present();

      this.service.rememberLogin(refreshToken.value)
        .subscribe(
          async (data) => {

            // remove old tokens
            await Storage.remove({ key: 'access_token' });
            await Storage.remove({ key: 'refresh_token' });

            await Storage.set({key: 'access_token', value: 'Bearer ' + data.data.tokens.access_token});
            await Storage.set({key: 'refresh_token', value: data.data.tokens.refresh_token});

            loading.dismiss();

            this.router.navigate(['/tabs/tab1']);
          },
          async (error) => {
            // delete possible old unvalid tokens
            await Storage.remove({ key: 'access_token' });
            await Storage.remove({ key: 'refresh_token' });

            loading.dismiss();
            console.log(error);
          }
        );
    }
  }

  async login() {

    /*
    await Storage.remove({ key: 'name' });

    await Storage.set({
      key: 'name',
      value: 'Max',
    });

    console.log(await Storage.get({ key: 'name' }));
    */

    if(this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {

      // unecessary?
      await Storage.remove({ key: 'access_token' });
      await Storage.remove({ key: 'refresh_token' });

      const loginData: LoginData = {
        email: this.email,
        password: this.password
      };

      this.service.login(loginData).subscribe(async (data) => {

        // store tokens in local database
        await Storage.set({key: 'access_token', value: 'Bearer ' + data.data.tokens.access_token});
        await Storage.set({key: 'refresh_token', value: data.data.tokens.refresh_token});

        this.router.navigate(['/tabs/tab1']);
      },
      (error) => {
        console.log(error.error.message);
      });

    }
    else {
      console.log('Invalid input');
      // TODO implement alert
    }
  }
}
