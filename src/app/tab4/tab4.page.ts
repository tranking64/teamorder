import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {

  constructor(private service: ApiService, private router: Router) { }

  async logout() {
    const accessToken = await Storage.get({ key: 'access_token' });
    let email;

    this.service.getCurrUserData(accessToken.value)
      .subscribe(
        (data) => {
          email = data.email;
        },
        (error) => {
          console.log(error);
        }
      );

    this.service.logout(email, accessToken.value)
      .subscribe(
        async (data) => {
          // delete tokens
          await Storage.remove({ key: 'access_token' });
          await Storage.remove({ key: 'refresh_token' });

          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);

          this.router.navigate(['/login']);
        }
      );
  }

}
