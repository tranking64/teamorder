import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../services/api/group.service';
import { OrderService } from '../../../services/api/order.service';

import { Storage } from '@capacitor/storage';
import { format, parseISO } from 'date-fns';
import { LoadingService } from '../../../services/loading.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {

  groupsArr = [];
  selectedGroupId;
  place = '';

  formattedDatetime = '';

  deadline;

  constructor(
    private groupService: GroupService,
    private orderService: OrderService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.deadline = new Date();
    this.deadline.setHours(this.deadline.getHours() + 1);
    this.deadline = this.deadline.toISOString();
  }

  ionViewWillEnter() {
    this.selectedGroupId = null;
    this.place = '';
    this.deadline = '';

    this.getCreatorGroups();
    this.getOtherGroups();
  }

  async getCreatorGroups() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getCreatorGroups(accessToken.value)
      .subscribe(
        data => this.groupsArr.push(data.data)
      );
  }

  async getOtherGroups() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getOtherGroups(accessToken.value)
      .subscribe(
        data => this.groupsArr.push(data.data)
      );
  }

  dateChanged(value) {
    this.deadline = value;
    this.formattedDatetime = format(parseISO(value), 'dd MMM yyyy, HH:mm');
  }

  async start() {

    this.loadingService.presentLoading();

    const accessToken = await Storage.get({ key: 'access_token' });

    this.orderService.createInitialOrder(
      accessToken.value,
      this.place,
      this.deadline.substring(0, this.deadline.length-6),
      this.selectedGroupId)
        .subscribe(
          data => {
            this.loadingService.dismissLoading();
            this.router.navigate(['/tabs/tab2']).then(() => this.router.navigate(['/tabs/tab1']));
          },
          error => {
            this.loadingService.dismissLoading();

            const errorCode = error.status;

            if (errorCode === 400) {
              this.alertService.presentSimpleAlert('Bitte fülle alle Eingabefelder aus!');
            }
            else {
              this.alertService.presentSimpleAlert(error.error.message);
            }
          }
        );
  }

}
