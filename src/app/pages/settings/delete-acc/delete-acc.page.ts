import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/api/settings.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-delete-acc',
  templateUrl: './delete-acc.page.html',
  styleUrls: ['./delete-acc.page.scss'],
})
export class DeleteAccPage implements OnInit {

  password;

  constructor(
    private settings: SettingsService,
    private router: Router,
    private loading: LoadingService,
    private alert: AlertService,
    private toast: ToastService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  getBack() {
    this.navCtrl.back();
  }

  async delete() {
    const accessToken = await Storage.get({key: 'access_token'});

    this.loading.presentLoading();

    this.settings.deleteAccount(this.password, accessToken.value)
      .subscribe(
        data => {
          this.loading.dismissLoading();
          this.router.navigate(['/login']);
          this.toast.presentSimpleToast('Account wurde erfolgreich gelöscht!');
        },
        error => {
          this.loading.dismissLoading();

          const errorCode = error.status;

          if (errorCode === 406) {
            this.alert.presentSimpleAlert('Passwort ist inkorrekt!');
          }
          else {
            this.alert.presentSimpleAlert(error.error.message);
          }
        }
      );
  }

}
