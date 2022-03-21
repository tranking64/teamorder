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
    private settingsService: SettingsService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  getBack() {
    this.navCtrl.back();
  }

  async delete() {
    const accessToken = await Storage.get({key: 'access_token'});

    this.loadingService.presentLoading();

    this.settingsService.deleteAccount(this.password, accessToken.value)
      .subscribe(
        data => {
          this.loadingService.dismissLoading();
          this.router.navigate(['/login']);
          this.toastService.presentSimpleToast('Account wurde erfolgreich gelöscht!');
        },
        error => {
          this.loadingService.dismissLoading();

          const errorCode = error.status;

          // check error type
          if (errorCode === 406) {
            this.alertService.presentSimpleAlert('Passwort ist inkorrekt!');
          }
          else {
            this.alertService.presentSimpleAlert(error.error.message);
          }
        }
      );
  }

}
