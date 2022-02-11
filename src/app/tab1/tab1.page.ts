import { Component } from '@angular/core';
import { OrderService } from '../services/api/order.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myInitialOrders = [];
  otherRunningOrders = [];

  constructor(
    private orderService: OrderService
  ) {}

  ionViewWillEnter() {
    this.getOtherRunningOrders();
    this.getMyInitialOrders();
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

}
