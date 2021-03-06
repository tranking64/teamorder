import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../services/api/group.service';
import { OrderService } from '../../../services/api/order.service';

import { Storage } from '@capacitor/storage';
import { format, parseISO } from 'date-fns';
import { LoadingService } from '../../../services/loading.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {

  groupsArr = [];
  selectedGroupId = null;
  place = '';
  formattedDatetime = '';

  deadline;
  hours = [];

  minHourTime;
  minRoundedTime;

  constructor(
    private groupService: GroupService,
    private orderService: OrderService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController
  ) { }

  // set up values for deadline-picker
  ngOnInit() {
    const currentDatetime = new Date();

    // increment by one because of local time
    currentDatetime.setHours(currentDatetime.getHours() + 1);

    // round up to next 15min, e.g.: 19:25 --> 19:30
    this.minRoundedTime  = new Date(Math.ceil(currentDatetime.getTime() / 900000) * 900000).toISOString();
    this.deadline = this.minRoundedTime;

    this.minHourTime = currentDatetime;
    this.minHourTime.setMinutes(0);
    this.minHourTime.setSeconds(0);
    this.minHourTime = this.minHourTime.toISOString();
  }

  ionViewWillEnter() {
    this.getCreatorGroups();
    this.getOtherGroups();
  }

  getBack() {
    // bypass refresh bug
    this.navCtrl.navigateBack(['/tabs/tab2']).then(() => this.router.navigate(['/tabs/tab1']));
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
    // validation of selected date; later than current time
    if (new Date(value.substring(0, 19)).getTime() < new Date(this.minRoundedTime.substring(0, 19)).getTime()) {
      this.alertService.presentSimpleAlert('Bitte w??hle eine sp??tere Deadline!');
    }
    else {
      this.deadline = value.substring(0, 19) + '+01:00';
      this.formattedDatetime = format(parseISO(this.deadline), 'dd MMM yyyy, HH:mm');
    }
  }

  async start() {

    if (this.place !== '' && this.formattedDatetime !== '' && this.selectedGroupId !== null) {
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
              this.getBack();
            },
            error => {
              this.loadingService.dismissLoading();
              this.alertService.presentSimpleAlert(error.error.message);
            }
          );
    }
    else {
      this.alertService.presentSimpleAlert('Bitte f??lle alle Eingabefelder aus!');
    }
  }

}
