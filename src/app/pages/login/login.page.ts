import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/login-data';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private service: ApiService, private router: Router) {}

  ngOnInit() {
  }

  async login() {

    await Storage.remove({ key: 'access_token' });
    await Storage.remove({ key: 'refresh_token' });
    /*
    await Storage.remove({ key: 'name' });

    await Storage.set({
      key: 'name',
      value: 'Max',
    });

    console.log(await Storage.get({ key: 'name' }));
    */

    const loginData: LoginData = {
      email: this.email,
      password: this.password
    };

    this.service.login(loginData).subscribe(async (data) => {

      // store tokens in local database
      await Storage.set({key: 'access_token', value: data.tokens.access_token});
      await Storage.set({key: 'refresh_token', value: data.tokens.refresh_token});

      this.router.navigate(['/tabs/tab1']);
    },
    (error) => {
      console.log(error);
    });
  }

}
