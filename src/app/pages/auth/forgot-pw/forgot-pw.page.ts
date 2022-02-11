import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.page.html',
  styleUrls: ['./forgot-pw.page.scss'],
})
export class ForgotPwPage implements OnInit {

  email: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService,
    private loading: LoadingService) { }

  ngOnInit() {
  }

  sendLink() {
    this.loading.presentLoading();

    this.auth.forgotPasswort(this.email)
    .subscribe(
      (data) => {
        this.loading.dismissLoading();
        this.router.navigate(['/new-pw']);
      },
      (error) => {
        this.loading.dismissLoading();

        if (error.status === 400 || 404) {
          this.alert.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
        }
        else {
          this.alert.presentSimpleAlert(error.error.message);
        }
      }
    );
  }

}
