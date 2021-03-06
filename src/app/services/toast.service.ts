import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  // shows a toast for 2 seconds
  async presentSimpleToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      color: 'success',
      duration: 2000
    });

    toast.present();
  }
}
