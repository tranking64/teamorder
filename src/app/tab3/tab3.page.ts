import { Component } from '@angular/core';
import { DebtService } from '../services/api/debt.service';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  debtors = [];
  creditors = [];

  constructor(
    private debtSerivce: DebtService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.getCreditors();
    this.getDebtors();
  }

  async getDebtors() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.debtSerivce.getDebtors(accessToken.value)
      .subscribe(
        data => this.debtors = data.data
      );
  }

  async getCreditors() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.debtSerivce.getCreditors(accessToken.value)
      .subscribe(
        data => this.creditors = data.data
      );
  }

  async presentAlert(item) {

    const accessToken = await Storage.get({ key: 'access_token' });

    const alert = await this.alertCtrl.create({
      header: 'Warnung',
      message: 'Du bestätigst hiermit, dass der User die Schulden beglichen hat!',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          //cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
          }
        }, {
          text: 'Bestätigen',
          id: 'confirm-button',
          handler: () => {
            this.debtSerivce.removeDebtor(accessToken.value, item.debtor.user_id)
              .subscribe(
                // bypass load bug
                () => this.router.navigate(['/tabs/tab1']).then(() => this.router.navigate(['tabs/tab3']))
              );
          }
        }
      ]
    });

    await alert.present();
  }

  paid(item) {
    this.presentAlert(item);
  }

}
