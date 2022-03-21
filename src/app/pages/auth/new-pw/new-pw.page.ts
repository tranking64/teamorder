import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/api/auth.service';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-pw',
  templateUrl: './new-pw.page.html',
  styleUrls: ['./new-pw.page.scss'],
})
export class NewPwPage implements OnInit {

  code;
  password;
  cPassword;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  getBack() {
    this.navCtrl.navigateBack('forgot-pw');
  }

  resetPassword() {
    if(this.password !== this.cPassword) {
      this.alertService.presentSimpleAlert('Neue Passwörter stimmen nicht überrein!');
    }
    else if (this.password.length < 8 && this.cPassword.length < 8) {
      this.alertService.presentSimpleAlert('Passwörter müssen mindestens 8 Zeichen haben!');
    }
    else {
      this.loadingService.presentLoading();

      this.authService.resetPassword(this.code, this.password)
        .subscribe(
          data => {
            this.loadingService.dismissLoading();
            this.router.navigate(['/login']);
            this.toastService.presentSimpleToast('Passwort wurde erfolgreich geändert!');
          },
          error => {
            this.loadingService.dismissLoading();

            const errorCode = error.status;

            // check on different error types
            if (errorCode === 400) {
              this.alertService.presentSimpleAlert('Unültige Eingaben!');
            }
            else if (errorCode === 401) {
              this.alertService.presentSimpleAlert('Der Code ist abgelaufen. Bitte fordere einen neuen Code an!');
            }
            else if (errorCode === 404 && error.error.status) {
              this.alertService.presentSimpleAlert('Du hast einen invaliden Code eingegeben!');
            }
            else {
              this.alertService.presentSimpleAlert(error.error.message);
            }
          }
        );
    }
  }

}
