import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/api/auth.service';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-pw',
  templateUrl: './new-pw.page.html',
  styleUrls: ['./new-pw.page.scss'],
})
export class NewPwPage implements OnInit {

  code: string;
  password: string;
  cPassword: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private loading: LoadingService,
    private alert: AlertService,
    private toast: ToastService) { }

  ngOnInit() {
  }

  resetPassword() {
    if(this.password !== this.cPassword) {
      this.alert.presentSimpleAlert('Neue Passwörter stimmen nicht überrein!');
    }
    else {
      this.loading.presentLoading();

      this.auth.resetPassword(this.code, this.password)
        .subscribe(
          data => {
            this.loading.dismissLoading();
            this.router.navigate(['/login']);
            this.toast.presentSimpleToast('Passwort wurde erfolgreich geändert!');
          },
          error => {
            this.loading.dismissLoading();

            const errorCode = error.status;

            if (errorCode === 400) {
              this.alert.presentSimpleAlert('Unültige Eingaben!');
            }
            else if (errorCode === 401) {
              this.alert.presentSimpleAlert('Der Code ist abgelaufen. Bitte fordere einen neuen Code an!');
            }
            else if (errorCode === 404 && error.error.status) {
              this.alert.presentSimpleAlert('Du hast einen invaliden Code eingegeben!');
            }
            else {
              this.alert.presentSimpleAlert(error.error.message);
            }
          }
        );
    }
  }

}
