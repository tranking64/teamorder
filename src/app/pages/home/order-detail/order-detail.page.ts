import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/api/order.service';
import { Storage } from '@capacitor/storage';
import { AlertService } from 'src/app/services/alert.service';

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
    private alert: AlertService
  ) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.initialOrderData = routerState.initialOrderData;
    this.orders = routerState.orders;
  }

  checkDeadline(cDeadline): boolean {

    // funktioniert nicht wenn es über Mitternacht läuft

    const deadline = new Date();
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
    const accessToken = await Storage.get({ key: 'access_token' });

    order.debt_amount = amount.replace(/,/g, '.');
    order.debt_amount = Number(order.debt_amount).toFixed(2);

    if (order.debt_amount > 0 && order.debt_amount < 10000) {
      this.orderService.updatePrice(accessToken.value, order.order_id, order.debt_amount)
      .subscribe(
      );
    }
    else {
      order.debt_amount = '';
      this.alert.presentSimpleAlert('Ungültiger Preiswert');
    }
  }

}
