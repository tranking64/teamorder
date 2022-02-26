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
    this.getInitialData();
  }

  checkOrderOpen(cDeadline): boolean {

    const deadline = new Date();
    deadline.setMonth(cDeadline.substring(5, 7)-1);
    deadline.setDate(cDeadline.substring(8, 10));
    deadline.setHours(cDeadline.substring(11, 13));
    deadline.setMinutes(cDeadline.substring(14, 16));
    deadline.setSeconds(0);

    return deadline.getTime() > new Date().getTime();
  }

  async getInitialData() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.orderService.getOtherOrders(accessToken.value)
      .subscribe(
        data => {
          this.otherRunningOrders = data.data;

          this.otherRunningOrders.sort(
            (curr, next) => {
              const currDeadline = new Date();
              currDeadline.setMonth(curr.deadline.substring(5, 7)-1);
              currDeadline.setDate(curr.deadline.substring(8, 10));
              currDeadline.setHours(curr.deadline.substring(11, 13));
              currDeadline.setMinutes(curr.deadline.substring(14, 16));
              currDeadline.setSeconds(0);

              const nextDeadline = new Date();
              nextDeadline.setMonth(next.deadline.substring(5, 7)-1);
              nextDeadline.setDate(next.deadline.substring(8, 10));
              nextDeadline.setHours(next.deadline.substring(11, 13));
              nextDeadline.setMinutes(next.deadline.substring(14, 16));
              nextDeadline.setSeconds(0);

              return currDeadline.getTime() > nextDeadline.getTime() ? -1 : 1;
            });
        }
      );

    this.orderService.getInitialOrders(accessToken.value)
      .subscribe(
        data => {
          this.myInitialOrders = data.data;
          this.myInitialOrders.sort(
            (curr, next) => {
              const currDeadline = new Date();
              currDeadline.setMonth(curr.deadline.substring(5, 7)-1);
              currDeadline.setDate(curr.deadline.substring(8, 10));
              currDeadline.setHours(curr.deadline.substring(11, 13));
              currDeadline.setMinutes(curr.deadline.substring(14, 16));
              currDeadline.setSeconds(0);

              const nextDeadline = new Date();
              nextDeadline.setMonth(next.deadline.substring(5, 7)-1);
              nextDeadline.setDate(next.deadline.substring(8, 10));
              nextDeadline.setHours(next.deadline.substring(11, 13));
              nextDeadline.setMinutes(next.deadline.substring(14, 16));
              nextDeadline.setSeconds(0);

              return currDeadline.getTime() < nextDeadline.getTime() ? -1 : 1;
            });
        }
      );

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

          const navExtras: NavigationExtras = {
            state: {
              initialOrderData: myInitialOrderData,
              orders: data.data.orders
            }
          };

          this.router.navigate(['order-detail'], navExtras);
        }
      );
  }

}
