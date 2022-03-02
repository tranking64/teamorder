import { Component } from '@angular/core';
import { DebtService } from '../services/api/debt.service';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  debtors = [];
  creditors = [];

  loaderActivated = false;

  constructor(
    private debtSerivce: DebtService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loaderActivated = true;
    this.getInitialData();
  }

  async getInitialData() {

    const accessToken = await Storage.get({ key: 'access_token' });

    this.debtSerivce.getDebtors(accessToken.value)
      .subscribe(
        data => this.debtors = data.data
      );

    this.debtSerivce.getCreditors(accessToken.value)
      .subscribe(
        data => {
          this.creditors = data.data;
          this.loaderActivated = false;
        }
      );
  }

  async presentAlert(item) {

    const accessToken = await Storage.get({ key: 'access_token' });

    const alert = await this.alertCtrl.create({
      header: 'Achtung',
      message: 'Du bestätigst hiermit, dass dieser User seine Schulden beglichen hat!',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => {
          }
        }, {
          text: 'Bestätigen',
          id: 'confirm-button',
          handler: () => {
            this.debtSerivce.removeDebtor(accessToken.value, item.debtor.user_id)
              .subscribe(
                () => this.debtors = this.debtors.filter(elem => elem !== item)
              );
          }
        }
      ]
    });

    await alert.present();
  }

}
