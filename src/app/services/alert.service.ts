import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController) { }

  async presentSimpleAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Achtung',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
