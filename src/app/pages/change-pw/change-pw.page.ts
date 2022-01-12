import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.page.html',
  styleUrls: ['./change-pw.page.scss'],
})
export class ChangePwPage implements OnInit {

  oldPassword: string;
  newPassword: string;
  cNewPassword: string;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
  }

  async change() {
    if (this.newPassword === this.cNewPassword) {
      const accessToken = await Storage.get({ key: 'access_token' });

      this.service.changePassword(this.oldPassword, this.newPassword, accessToken.value)
        .subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(['/tabs/tab4']);
            // show toast, pw successfully changed
          },
          (error) => console.log(error)
        );
    }
    else {
      // TODO: implement alert, passwords do not match
    }
  }

}
