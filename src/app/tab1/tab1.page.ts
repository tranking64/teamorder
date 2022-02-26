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

    const deadline = this.createDate(cDeadline);

    return deadline.getTime() > new Date().getTime();
  }

  createDate(data) {
    const newDate = new Date();
    newDate.setMonth(data.substring(5, 7)-1);
    newDate.setDate(data.substring(8, 10));
    newDate.setHours(data.substring(11, 13));
    newDate.setMinutes(data.substring(14, 16));
    newDate.setSeconds(0);

    return newDate;
  }

  async getInitialData() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.orderService.getOtherOrders(accessToken.value)
      .subscribe(
        data => {
          this.otherRunningOrders = data.data;

          if (this.otherRunningOrders.length > 1) {
            this.otherRunningOrders.sort(
              (curr, next) => {
                const currDeadline = this.createDate(curr.deadline);
                const nextDeadline = this.createDate(next.deadline);

                return currDeadline.getTime() > nextDeadline.getTime() ? -1 : 1;
              });
          }
        }
      );

    this.orderService.getInitialOrders(accessToken.value)
      .subscribe(
        data => {
          this.myInitialOrders = data.data;

          if(this.myInitialOrders.length > 1) {
            this.myInitialOrders.sort(
              (curr, next) => {
                const currDeadline = this.createDate(curr.deadline);
                const nextDeadline = this.createDate(next.deadline);

                return currDeadline.getTime() < nextDeadline.getTime() ? -1 : 1;
              });
          }
        }
      );

    this.orderService.getWithOrderings(accessToken.value)
      .subscribe(data => this.currentWithOrderings = data.data);
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

  createOrder() {
    this.router.navigate(['/create-order']);
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
