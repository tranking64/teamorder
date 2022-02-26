import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/api/order.service';
import { Storage } from '@capacitor/storage';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-with-orderings-detail',
  templateUrl: './with-orderings-detail.page.html',
  styleUrls: ['./with-orderings-detail.page.scss'],
})
export class WithOrderingsDetailPage implements OnInit {

  currData;
  orders = [];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.currData = routerState;
    this.orders = this.currData.orders;
  }

  getBack() {
    this.navCtrl.navigateBack(['/tabs/tab2']).then(() => this.router.navigate(['/tabs/tab1']));
  }

  async presentDeleteAlert(item) {
    const accessToken = await Storage.get({ key: 'access_token' });

    const alert = await this.alertCtrl.create({
      header: 'Warnung',
      message: 'Möchtest du diese Mitbestellung wirklich löschen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => {
          }
        }, {
          text: 'Ja',
          id: 'confirm-button',
          handler: () => {
            this.orderService.removeWithOrder(accessToken.value, item.order_id)
              .subscribe(
                () => {
                  if(this.orders.length-1 === 0) {
                    this.getBack();
                  }
                  else {
                    this.orders = this.orders.filter(element => element !== item);
                  }
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }

}
