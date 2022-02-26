import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/api/order.service';
import { Storage } from '@capacitor/storage';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  initialOrderData;
  orders = [];
  enableButton = false;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private alert: AlertService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.initialOrderData = routerState.initialOrderData;
    this.orders = routerState.orders;
  }

  getBack() {
    this.navCtrl.navigateBack(['/tabs/tab2']).then(() => this.router.navigate(['/tabs/tab1']));
  }

  checkDeadline(cDeadline): boolean {
    const deadline = new Date();

    deadline.setMonth(cDeadline.substring(5, 7)-1);
    deadline.setDate(cDeadline.substring(8, 10));
    deadline.setHours(cDeadline.substring(11, 13));
    deadline.setMinutes(cDeadline.substring(14, 16));
    deadline.setSeconds(0);

    return deadline.getTime() > new Date().getTime();
  }

  async finish(orderId) {

    const accessToken = await Storage.get({ key: 'access_token' });

    this.orderService.finishOrder(accessToken.value, orderId)
      .subscribe(
        data => {
          this.router.navigate(['/tabs/tab2']).then(() => this.router.navigate(['/tabs/tab1']));
        },
        error => this.alert.presentSimpleAlert('Fülle bitte alle Preiseingaben aus!')
      );
  }

  async updatePrice(order, amount) {
    if (amount !== '') {
      const accessToken = await Storage.get({ key: 'access_token' });

      order.debt_amount = amount.replace(/,/g, '.');
      order.debt_amount = Number(order.debt_amount).toFixed(2);

      if (order.debt_amount > 0 && order.debt_amount <= 100) {
        this.orderService.updatePrice(accessToken.value, order.order_id, order.debt_amount)
          .subscribe();
      }
      else {
        order.debt_amount = '';
        this.alert.presentSimpleAlert('Ungültiger Preiswert (der Betrag darf maximal 100€ sein)');
      }
    }
  }

}
