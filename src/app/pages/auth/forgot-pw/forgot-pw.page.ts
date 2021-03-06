import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.page.html',
  styleUrls: ['./forgot-pw.page.scss'],
})
export class ForgotPwPage implements OnInit {

  email;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  getBack() {
    this.navCtrl.navigateBack('/login');
  }

  sendLink() {
    this.loadingService.presentLoading();

    this.authService.forgotPasswort(this.email)
      .subscribe(
        data => {
          this.loadingService.dismissLoading();

          this.router.navigate(['/new-pw']);
        },
        error => {
          this.loadingService.dismissLoading();

          // check http error code
          if (error.status === 400 || 404) {
            this.alertService.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
          }
          else {
            this.alertService.presentSimpleAlert(error.error.message);
          }
        }
      );
  }

}
