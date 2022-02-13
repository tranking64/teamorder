import { Component } from '@angular/core';
import { OrderService } from '../services/api/order.service';
import { Storage } from '@capacitor/storage';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myInitialOrders = [];
  otherRunningOrders = [];
  currentWithOrderings = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.getOtherRunningOrders();
    this.getMyInitialOrders();
    this.getCurrentOrderings();
  }

  async getOtherRunningOrders() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.orderService.getOtherOrders(accessToken.value)
      .subscribe(
        data => this.otherRunningOrders = data.data
      );
  }

  async getMyInitialOrders() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.orderService.getInitialOrders(accessToken.value)
      .subscribe(
        data => this.myInitialOrders = data.data
      );
  }

  async getCurrentOrderings() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.orderService.getWithOrderings(accessToken.value)
      .subscribe(
        data => this.currentWithOrderings = data.data
      );
  }

  orderingData(data) {
    const navExtras: NavigationExtras = {
      state: data
    };

    this.router.navigate(['with-orderings-detail'], navExtras);
  }

  orderWith(initialOrderData) {
    const navExtras: NavigationExtras = {
      state: initialOrderData
    };

    this.router.navigate(['order-with'], navExtras);
  }

  async detailView(myInitialOrderData) {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.orderService.getSpecificOrders(accessToken.value, myInitialOrderData.initial_order_id)
      .subscribe(
        data => {
          const passedData = {
            initialOrderData: myInitialOrderData,
            orders: data.data.orders
          };

          const navExtras: NavigationExtras = {
            state: passedData
          };

          this.router.navigate(['order-detail'], navExtras);
        }
      );
  }

}
