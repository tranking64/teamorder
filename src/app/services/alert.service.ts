import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController) { }

  // show an alert until it is closed by clicking the OK-button
  async presentSimpleAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Achtung',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
